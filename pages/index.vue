<template>
    <div class="modern-homepage">
        <!-- Modern Hero Section -->
        <section class="hero-section">
            <div class="hero-background">
                <div class="hero-gradient"></div>
                <div class="hero-particles"></div>
            </div>
            <div class="container">
                <div class="hero-content">
                    <h1 class="hero-title">
                        <span class="hero-title__main">{{ appConfig.storeName }}</span>
                        <span class="hero-title__sub">Premium Minecraft Deneyimi</span>
                    </h1>
                    <p class="hero-description">
                        En kaliteli paketler, özel içerikler ve benzersiz deneyimler için doğru yerdesiniz.
                        Sunucumuzda maceraya başlayın!
                    </p>
                    <div class="hero-actions">
                        <Button variant="primary" size="lg" class="hero-btn">
                            <Icon name="play" size="20px" />
                            Hemen Başla
                        </Button>
                        <Button variant="secondary" size="lg" class="hero-btn">
                            <Icon name="discord" size="20px" />
                            Discord'a Katıl
                        </Button>
                    </div>
                    <div class="hero-stats">
                        <div class="hero-stat">
                            <span class="hero-stat__number">2,847</span>
                            <span class="hero-stat__label">Aktif Oyuncu</span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat__number">15,392</span>
                            <span class="hero-stat__label">Toplam Üye</span>
                        </div>
                        <div class="hero-stat">
                            <span class="hero-stat__number">99.9%</span>
                            <span class="hero-stat__label">Uptime</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Dashboard Stats -->
        <section class="dashboard-section">
            <div class="container">
                <div class="dashboard-header">
                    <h2>Canlı İstatistikler</h2>
                    <p>Sunucumuzun gerçek zamanlı verileri</p>
                </div>
                <div class="row">
                    <div class="col-12 col-md-6 col-lg-3">
                        <StatsCard 
                            icon="users"
                            :value="2847"
                            label="Çevrimiçi Oyuncu"
                            change="+12%"
                            changeType="positive"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <StatsCard 
                            icon="shopping-cart"
                            :value="'₺45,230'"
                            label="Bu Ay Satış"
                            change="+8.2%"
                            changeType="positive"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <StatsCard 
                            icon="package"
                            :value="1247"
                            label="Satılan Paket"
                            change="+15.3%"
                            changeType="positive"
                        />
                    </div>
                    <div class="col-12 col-md-6 col-lg-3">
                        <StatsCard 
                            icon="star"
                            :value="4.9"
                            label="Müşteri Puanı"
                            change="+0.2"
                            changeType="positive"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Packages -->
        <section class="featured-section">
            <div class="container">
                <div class="section-header">
                    <h2>Öne Çıkan Paketler</h2>
                    <p>En popüler ve özel indirimli paketlerimizi keşfedin</p>
                </div>
                <div class="row" v-if="categories">
                    <div 
                        class="col-12 col-md-6 col-lg-4"
                        v-for="pkg in featuredPackages"
                        :key="pkg.id"
                    >
                        <div class="featured-package">
                            <DiscountBadge 
                                :discount="pkg.discount || 0"
                                :timeLeft="pkg.timeLeft"
                                :variant="pkg.discount > 50 ? 'hot' : 'default'"
                            />
                            <PackageCard :pkg="pkg" hide-options />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Community Section -->
        <section class="community-section">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-lg-8">
                        <div class="row">
                            <div class="col-12 col-md-6">
                                <div class="announcements-card">
                                    <h3>Son Duyurular</h3>
                                    <div class="announcements-list">
                                        <AnnouncementCard 
                                            title="Yeni Sezon Başladı!"
                                            content="Season 5 ile birlikte gelen yeni özellikler ve etkinlikler sizi bekliyor."
                                            date="2024-01-15"
                                            link="/announcements/season-5"
                                        />
                                        <AnnouncementCard 
                                            title="Özel İndirim Kampanyası"
                                            content="Tüm VIP paketlerinde %30 indirim! Kampanya 31 Ocak'a kadar geçerli."
                                            date="2024-01-10"
                                            link="/announcements/discount-campaign"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6">
                                <TopCustomers />
                            </div>
                        </div>
                        <div class="row mt-4">
                            <div class="col-12">
                                <RecentPayments />
                            </div>
                        </div>
                    </div>
                    <div class="col-12 col-lg-4">
                        <DiscordBanner 
                            :discordUrl="appConfig.discordUrl"
                            :onlineMembers="1247"
                            :totalMembers="8932"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Grid -->
        <section class="categories-section" v-if="categories && categories.length > 0">
            <div class="container">
                <div class="section-header">
                    <h2>Paket Kategorileri</h2>
                    <p>İhtiyacınıza uygun paketi bulun</p>
                </div>
                <div class="categories-grid">
                    <NuxtLink
                        v-for="category in categories"
                        :key="category.id"
                        :to="{ hash: `#${titleCase(category.name)}` }"
                        class="category-card-modern"
                    >
                        <div class="category-card-modern__image">
                            <img :src="category.packages[0]?.image" :alt="category.name" />
                        </div>
                        <div class="category-card-modern__content">
                            <h3>{{ category.name }}</h3>
                            <p>{{ category.packages.length }} paket</p>
                        </div>
                        <div class="category-card-modern__arrow">
                            <Icon name="arrow-right" size="20px" />
                        </div>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Package Categories -->
        <div class="container">
            <div
                v-for="category in categories"
                :key="category.id"
                :id="titleCase(category.name)"
                class="category-section"
            >
                <HeaderCard>
                    <div class="category-header">
                        <img 
                            :src="category.packages[0]?.image" 
                            :alt="category.name"
                            class="category-icon"
                        />
                        <div>
                            <h3>{{ category.name }}</h3>
                            <p>{{ category.description || `${category.packages.length} paket mevcut` }}</p>
                        </div>
                    </div>
                </HeaderCard>

                <div class="row">
                    <div
                        class="col-12 col-sm-6 col-md-4 col-lg-3"
                        v-for="pkg in category.packages"
                        :key="pkg.id"
                    >
                        <div class="package-wrapper">
                            <DiscountBadge 
                                v-if="pkg.discount"
                                :discount="pkg.discount"
                                variant="default"
                            />
                            <PackageCard :pkg="pkg" hide-options />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Login Modal -->
    <NuxtPage />
</template>

<script lang="ts" setup>
const { t } = useI18n();
const appConfig = useAppConfig();

useSeoMeta({
    ogTitle: `${appConfig.storeName} - Premium Minecraft Deneyimi`,
    description: "En kaliteli Minecraft paketleri ve özel içerikler. Sunucumuzda maceraya başlayın!",
    ogDescription: "En kaliteli Minecraft paketleri ve özel içerikler. Sunucumuzda maceraya başlayın!",
    ogImage: "/hero-bg.jpg",
    twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});

// Featured packages with mock discount data
const featuredPackages = computed(() => {
    if (!categories.value) return [];
    
    const allPackages = categories.value.flatMap(cat => cat.packages);
    return allPackages.slice(0, 6).map((pkg, index) => ({
        ...pkg,
        discount: [25, 50, 75, 30, 40, 60][index] || 0,
        timeLeft: [3600, 7200, 1800, 5400, 2700, 4500][index] || null,
    }));
});
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.modern-homepage {
    min-height: 100vh;
}

// Hero Section
.hero-section {
    position: relative;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: linear-gradient(135deg, $background-100 0%, $background-200 100%);
}

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
}

.hero-gradient {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
}

.hero-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
        radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.3) 0%, transparent 50%);
    animation: float 20s ease-in-out infinite;
}

.hero-content {
    position: relative;
    z-index: 2;
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.hero-title {
    margin: 0 0 24px 0;
    
    &__main {
        display: block;
        font-size: 4rem;
        font-weight: 900;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        margin-bottom: 8px;
        
        @include tools.media-breakpoint-up("md") {
            font-size: 5rem;
        }
    }
    
    &__sub {
        display: block;
        font-size: 1.5rem;
        font-weight: 400;
        color: $text-medium-emphasis-color;
        
        @include tools.media-breakpoint-up("md") {
            font-size: 2rem;
        }
    }
}

.hero-description {
    font-size: 1.25rem;
    color: $text-medium-emphasis-color;
    line-height: 1.6;
    margin: 0 0 40px 0;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-actions {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-bottom: 60px;
    flex-wrap: wrap;
}

.hero-btn {
    min-width: 180px;
}

.hero-stats {
    display: flex;
    justify-content: center;
    gap: 60px;
    flex-wrap: wrap;
}

.hero-stat {
    text-align: center;
    
    &__number {
        display: block;
        font-size: 2rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin-bottom: 4px;
    }
    
    &__label {
        font-size: 0.875rem;
        color: $text-medium-emphasis-color;
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }
}

// Dashboard Section
.dashboard-section {
    padding: 80px 0;
    background: $background-100;
}

.dashboard-header {
    text-align: center;
    margin-bottom: 60px;
    
    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin: 0 0 16px 0;
    }
    
    p {
        font-size: 1.125rem;
        color: $text-medium-emphasis-color;
        margin: 0;
    }
}

// Featured Section
.featured-section {
    padding: 80px 0;
    background: linear-gradient(135deg, $background-200 0%, $background-100 100%);
}

.section-header {
    text-align: center;
    margin-bottom: 60px;
    
    h2 {
        font-size: 2.5rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin: 0 0 16px 0;
    }
    
    p {
        font-size: 1.125rem;
        color: $text-medium-emphasis-color;
        margin: 0;
    }
}

.featured-package {
    position: relative;
    height: 100%;
}

// Community Section
.community-section {
    padding: 80px 0;
    background: $background-100;
}

.announcements-card {
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    height: 100%;
    
    h3 {
        color: $text-high-emphasis-color;
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0 0 20px 0;
    }
}

.announcements-list {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

// Categories Section
.categories-section {
    padding: 80px 0;
    background: linear-gradient(135deg, $background-200 0%, $background-100 100%);
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 24px;
}

.category-card-modern {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    text-decoration: none;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
        border-color: rgba(99, 102, 241, 0.3);
        text-decoration: none;
    }
    
    &__image {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        overflow: hidden;
        background: $c-300;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    &__content {
        flex: 1;
        
        h3 {
            color: $text-high-emphasis-color;
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 4px 0;
        }
        
        p {
            color: $text-medium-emphasis-color;
            font-size: 0.875rem;
            margin: 0;
        }
    }
    
    &__arrow {
        color: $primary;
        transition: transform 0.3s ease;
    }
    
    &:hover &__arrow {
        transform: translateX(4px);
    }
}

// Category Section
.category-section {
    margin-bottom: 80px;
}

.category-header {
    display: flex;
    align-items: center;
    gap: 20px;
}

.category-icon {
    width: 60px;
    height: 60px;
    border-radius: 12px;
    object-fit: cover;
}

.package-wrapper {
    position: relative;
    height: 100%;
}

// Animations
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}
</style>