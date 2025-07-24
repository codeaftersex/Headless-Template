<template>
    <div class="modern-header" :class="{ 'modern-header--scrolled': isScrolled }">
        <div class="modern-header__background"></div>
        <div class="modern-header__container container">
            <nav class="modern-header__nav">
                <!-- Logo Section -->
                <div class="modern-header__logo">
                    <NuxtLink to="/" class="logo-link">
                        <div class="logo-icon">
                            <Icon name="home" size="24px" />
                        </div>
                        <span class="logo-text">{{ appConfig.storeName }}</span>
                    </NuxtLink>
                </div>

                <!-- Desktop Navigation -->
                <div class="modern-header__menu desktop-menu">
                    <div class="nav-item dropdown" @mouseenter="showDropdown = 'categories'" @mouseleave="showDropdown = null">
                        <NuxtLink to="#categories" class="nav-link">
                            <Icon name="package" size="18px" />
                            {{ $t('nav.categories') }}
                            <Icon name="arrow-right" size="14px" class="dropdown-arrow" />
                        </NuxtLink>
                        <div class="dropdown-menu" v-show="showDropdown === 'categories'">
                            <div class="dropdown-grid">
                                <NuxtLink 
                                    v-for="category in categories?.slice(0, 6)" 
                                    :key="category.id"
                                    :to="`#${titleCase(category.name)}`"
                                    class="dropdown-item"
                                    @click="showDropdown = null"
                                >
                                    <div class="dropdown-item__icon">
                                        <img v-if="category.packages[0]?.image" :src="category.packages[0].image" :alt="category.name" />
                                        <Icon v-else name="package" size="20px" />
                                    </div>
                                    <div class="dropdown-item__content">
                                        <h4>{{ category.name }}</h4>
                                        <p>{{ category.packages.length }} items</p>
                                    </div>
                                </NuxtLink>
                            </div>
                        </div>
                    </div>

                    <div class="nav-item dropdown" @mouseenter="showDropdown = 'services'" @mouseleave="showDropdown = null">
                        <a href="#" class="nav-link">
                            <Icon name="shield" size="18px" />
                            Services
                            <Icon name="arrow-right" size="14px" class="dropdown-arrow" />
                        </a>
                        <div class="dropdown-menu" v-show="showDropdown === 'services'">
                            <div class="dropdown-list">
                                <a href="#" class="dropdown-item">
                                    <Icon name="shield" size="18px" />
                                    <span>{{ $t('nav.open_source') }}</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="check-circle" size="18px" />
                                    <span>{{ $t('nav.escrow') }}</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="users" size="18px" />
                                    <span>Custom Development</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="star" size="18px" />
                                    <span>Premium Support</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="nav-item dropdown" @mouseenter="showDropdown = 'team'" @mouseleave="showDropdown = null">
                        <a href="#" class="nav-link">
                            <Icon name="users" size="18px" />
                            Team
                            <Icon name="arrow-right" size="14px" class="dropdown-arrow" />
                        </a>
                        <div class="dropdown-menu" v-show="showDropdown === 'team'">
                            <div class="dropdown-list">
                                <a href="#" class="dropdown-item">
                                    <Icon name="users" size="18px" />
                                    <span>{{ $t('nav.teammates') }}</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="terminal" size="18px" />
                                    <span>{{ $t('nav.workers') }}</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="award" size="18px" />
                                    <span>Contributors</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div class="nav-item dropdown" @mouseenter="showDropdown = 'legal'" @mouseleave="showDropdown = null">
                        <a href="#" class="nav-link">
                            <Icon name="shield" size="18px" />
                            Legal
                            <Icon name="arrow-right" size="14px" class="dropdown-arrow" />
                        </a>
                        <div class="dropdown-menu" v-show="showDropdown === 'legal'">
                            <div class="dropdown-list">
                                <a href="#" class="dropdown-item">
                                    <Icon name="arrow-right" size="18px" />
                                    <span>{{ $t('nav.refund_policy') }}</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="shield" size="18px" />
                                    <span>{{ $t('nav.terms') }}</span>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <Icon name="eye" size="18px" />
                                    <span>{{ $t('nav.privacy') }}</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Section -->
                <div class="modern-header__actions">
                    <!-- Language Selector -->
                    <div class="language-selector dropdown" @mouseenter="showDropdown = 'language'" @mouseleave="showDropdown = null">
                        <button class="language-btn">
                            <Icon name="globe" size="18px" />
                            <span class="current-lang">{{ currentLocale.toUpperCase() }}</span>
                            <Icon name="arrow-right" size="14px" class="dropdown-arrow" />
                        </button>
                        <div class="dropdown-menu language-menu" v-show="showDropdown === 'language'">
                            <button 
                                v-for="locale in availableLocales" 
                                :key="locale.code"
                                @click="setLocale(locale.code)"
                                class="language-option"
                                :class="{ active: locale.code === currentLocale }"
                            >
                                <span class="flag">{{ locale.flag }}</span>
                                <span>{{ locale.name }}</span>
                            </button>
                        </div>
                    </div>

                    <!-- User Account -->
                    <ClientOnly>
                        <Button
                            class="user-btn"
                            variant="clear"
                            :to="authStore.loginRoute"
                        >
                            <Avatar :user="authStore.user" :width="32" :height="32" />
                            <span class="user-name">
                                {{ authStore.isAuthenticated ? authStore.user.username : 'Login' }}
                            </span>
                        </Button>
                    </ClientOnly>

                    <!-- Cart -->
                    <Button
                        class="cart-btn"
                        variant="primary"
                        @click="uiStore.toggleItem('cart-sidebar')"
                    >
                        <Icon name="shopping-cart" size="18px" />
                        <span class="cart-count" v-if="basketStore.basket?.packages?.length">
                            {{ basketStore.basket.packages.length }}
                        </span>
                        <span class="cart-text">Cart</span>
                    </Button>

                    <!-- Mobile Menu Toggle -->
                    <Button
                        class="mobile-menu-btn d-lg-none"
                        variant="clear"
                        @click="uiStore.toggleItem('mobile-menu')"
                    >
                        <Icon name="menu" size="24px" />
                    </Button>
                </div>
            </nav>
        </div>

        <!-- Mobile Menu -->
        <div class="mobile-menu" :class="{ 'mobile-menu--open': uiStore.isItemActive('mobile-menu') }">
            <div class="mobile-menu__content">
                <div class="mobile-menu__header">
                    <h3>Menu</h3>
                    <Button variant="clear" @click="uiStore.toggleItem('mobile-menu')" class="close-btn">
                        <Icon name="close" size="24px" />
                    </Button>
                </div>
                <div class="mobile-menu__items">
                    <a href="#categories" class="mobile-menu__item" @click="uiStore.toggleItem('mobile-menu')">
                        <Icon name="package" size="20px" />
                        {{ $t('nav.categories') }}
                    </a>
                    <a href="#" class="mobile-menu__item">
                        <Icon name="shield" size="20px" />
                        {{ $t('nav.open_source') }}
                    </a>
                    <a href="#" class="mobile-menu__item">
                        <Icon name="check-circle" size="20px" />
                        {{ $t('nav.escrow') }}
                    </a>
                    <a href="#" class="mobile-menu__item">
                        <Icon name="users" size="20px" />
                        {{ $t('nav.teammates') }}
                    </a>
                    <a href="#" class="mobile-menu__item">
                        <Icon name="terminal" size="20px" />
                        {{ $t('nav.workers') }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();
const uiStore = useUIStore();
const authStore = useAuthStore();
const basketStore = useBasketStore();
const { locale, setLocale } = useI18n();

const showDropdown = ref<string | null>(null);
const isScrolled = ref(false);

const currentLocale = computed(() => locale.value);

const availableLocales = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
];

// Handle scroll effect
const { y } = useWindowScroll();
watch(y, (newY) => {
    isScrolled.value = newY > 50;
});

// Fetch categories for dropdown
const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.modern-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    backdrop-filter: blur(20px);
    
    &__background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, 
            rgba(15, 15, 15, 0.8) 0%, 
            rgba(26, 26, 26, 0.9) 50%,
            rgba(15, 15, 15, 0.8) 100%
        );
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.4s ease;
    }
    
    &--scrolled {
        .modern-header__background {
            background: linear-gradient(135deg, 
                rgba(15, 15, 15, 0.95) 0%, 
                rgba(26, 26, 26, 0.98) 50%,
                rgba(15, 15, 15, 0.95) 100%
            );
            border-bottom-color: rgba(99, 102, 241, 0.3);
        }
    }
    
    &__container {
        position: relative;
        z-index: 2;
    }
    
    &__nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
        min-height: 80px;
    }
    
    &__logo {
        .logo-link {
            display: flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
            color: $text-high-emphasis-color;
            font-weight: 700;
            font-size: 1.25rem;
            transition: all 0.3s ease;
            
            &:hover {
                color: $primary;
                transform: translateY(-2px);
                text-decoration: none;
            }
        }
        
        .logo-icon {
            width: 40px;
            height: 40px;
            background: linear-gradient(135deg, $primary 0%, $success 100%);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            transition: all 0.3s ease;
            
            &:hover {
                transform: rotate(5deg) scale(1.1);
                box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
            }
        }
        
        .logo-text {
            background: linear-gradient(135deg, $primary 0%, $success 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
    }
    
    &__menu {
        display: none;
        
        @include tools.media-breakpoint-up("lg") {
            display: flex;
            align-items: center;
            gap: 2rem;
        }
    }
    
    &__actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
}

// Navigation Items
.nav-item {
    position: relative;
    
    .nav-link {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        color: $text-medium-emphasis-color;
        text-decoration: none;
        border-radius: 12px;
        font-weight: 500;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            transition: left 0.5s ease;
        }
        
        &:hover {
            color: $text-high-emphasis-color;
            background: rgba(99, 102, 241, 0.1);
            transform: translateY(-2px);
            text-decoration: none;
            
            &::before {
                left: 100%;
            }
            
            .dropdown-arrow {
                transform: rotate(90deg);
            }
        }
    }
    
    .dropdown-arrow {
        transition: transform 0.3s ease;
    }
}

// Dropdown Menus
.dropdown-menu {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 16px;
    min-width: 280px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(20px);
    animation: dropdownSlide 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        transform: translateX(-50%);
        width: 16px;
        height: 16px;
        background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-bottom: none;
        border-right: none;
        transform: translateX(-50%) rotate(45deg);
    }
}

.dropdown-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
}

.dropdown-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    color: $text-medium-emphasis-color;
    text-decoration: none;
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(99, 102, 241, 0.1);
        color: $text-high-emphasis-color;
        transform: translateX(4px);
        text-decoration: none;
    }
    
    &__icon {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        overflow: hidden;
        background: $c-300;
        display: flex;
        align-items: center;
        justify-content: center;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    &__content {
        h4 {
            margin: 0;
            font-size: 0.875rem;
            font-weight: 600;
            color: $text-high-emphasis-color;
        }
        
        p {
            margin: 0;
            font-size: 0.75rem;
            color: $text-medium-emphasis-color;
        }
    }
}

// Language Selector
.language-selector {
    position: relative;
}

.language-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: $text-medium-emphasis-color;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(99, 102, 241, 0.1);
        border-color: rgba(99, 102, 241, 0.3);
        color: $text-high-emphasis-color;
    }
}

.language-menu {
    min-width: 160px;
}

.language-option {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 12px;
    background: none;
    border: none;
    color: $text-medium-emphasis-color;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
    
    &:hover, &.active {
        background: rgba(99, 102, 241, 0.1);
        color: $text-high-emphasis-color;
    }
    
    .flag {
        font-size: 1.2rem;
    }
}

// Action Buttons
.user-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(99, 102, 241, 0.1);
        transform: translateY(-2px);
    }
    
    .user-name {
        font-weight: 500;
        
        @include tools.media-breakpoint-up("md") {
            display: block;
        }
        
        @media (max-width: 768px) {
            display: none;
        }
    }
}

.cart-btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 16px;
    background: linear-gradient(135deg, $primary 0%, $success 100%);
    border-radius: 12px;
    color: white;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
    }
    
    .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: $danger;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.75rem;
        font-weight: 700;
    }
    
    .cart-text {
        @media (max-width: 576px) {
            display: none;
        }
    }
}

.mobile-menu-btn {
    padding: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    
    &:hover {
        background: rgba(99, 102, 241, 0.1);
    }
}

// Mobile Menu
.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.9);
    backdrop-filter: blur(20px);
    z-index: 999;
    transform: translateX(-100%);
    transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &--open {
        transform: translateX(0);
    }
    
    &__content {
        background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
        width: 300px;
        height: 100%;
        padding: 2rem;
    }
    
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        
        h3 {
            color: $text-high-emphasis-color;
            margin: 0;
        }
    }
    
    &__items {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    
    &__item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        color: $text-medium-emphasis-color;
        text-decoration: none;
        border-radius: 12px;
        transition: all 0.3s ease;
        
        &:hover {
            background: rgba(99, 102, 241, 0.1);
            color: $text-high-emphasis-color;
            transform: translateX(8px);
            text-decoration: none;
        }
    }
}

// Animations
@keyframes dropdownSlide {
    from {
        opacity: 0;
        transform: translateX(-50%) translateY(-10px);
    }
    to {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}

// Add globe icon
.modern-header {
    :deep(.icon-globe) {
        // Add globe icon styles if needed
    }
}
</style>