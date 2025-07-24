<template>
    <div class="modern-fivem-store">
        <!-- Hero Section with Advanced Animations -->
        <section class="hero-section">
            <div class="hero-background">
                <div class="hero-gradient"></div>
                <div class="hero-particles">
                    <div class="particle" v-for="i in 50" :key="i" :style="getParticleStyle(i)"></div>
                </div>
                <div class="hero-waves">
                    <div class="wave wave-1"></div>
                    <div class="wave wave-2"></div>
                    <div class="wave wave-3"></div>
                </div>
            </div>
            
            <div class="container hero-container">
                <div class="hero-content">
                    <div class="hero-badge">
                        <Icon name="zap" size="16px" />
                        <span>Premium FiveM Resources</span>
                        <div class="badge-glow"></div>
                    </div>
                    
                    <h1 class="hero-title">
                        <span class="title-line title-line--1">{{ $t('index.hero.title') }}</span>
                        <span class="title-line title-line--2">{{ $t('index.hero.subtitle') }}</span>
                    </h1>
                    
                    <p class="hero-description">
                        {{ $t('index.hero.description') }}
                    </p>
                    
                    <div class="hero-actions">
                        <Button variant="primary" size="lg" class="hero-btn hero-btn--primary">
                            <Icon name="shopping-cart" size="20px" />
                            {{ $t('index.hero.cta_primary') }}
                            <div class="btn-glow"></div>
                        </Button>
                        <Button variant="secondary" size="lg" class="hero-btn hero-btn--secondary" :href="appConfig.discordUrl" external>
                            <Icon name="discord" size="20px" />
                            {{ $t('index.hero.cta_secondary') }}
                        </Button>
                    </div>
                    
                    <div class="hero-stats">
                        <div class="stat-item" v-for="(stat, index) in heroStats" :key="index">
                            <div class="stat-icon">
                                <Icon :name="stat.icon" size="24px" />
                            </div>
                            <div class="stat-content">
                                <span class="stat-number">{{ stat.number }}</span>
                                <span class="stat-label">{{ stat.label }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="hero-visual">
                    <div class="visual-container">
                        <div class="floating-card floating-card--1">
                            <Icon name="shield" size="32px" />
                            <span>Secure</span>
                        </div>
                        <div class="floating-card floating-card--2">
                            <Icon name="zap" size="32px" />
                            <span>Fast</span>
                        </div>
                        <div class="floating-card floating-card--3">
                            <Icon name="star" size="32px" />
                            <span>Premium</span>
                        </div>
                        <div class="main-visual">
                            <div class="visual-glow"></div>
                            <Icon name="package" size="120px" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="features-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Why Choose FiveM Elite?</h2>
                    <p class="section-subtitle">Experience the difference with our premium resources</p>
                </div>
                
                <div class="features-grid">
                    <div class="feature-card" v-for="(feature, index) in features" :key="index">
                        <div class="feature-icon">
                            <Icon :name="feature.icon" size="32px" />
                            <div class="icon-glow"></div>
                        </div>
                        <h3>{{ feature.title }}</h3>
                        <p>{{ feature.description }}</p>
                        <div class="feature-hover-effect"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Categories Section -->
        <section class="categories-section" id="categories" v-if="categories && categories.length > 0">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Browse Categories</h2>
                    <p class="section-subtitle">Find the perfect resources for your server</p>
                </div>
                
                <div class="categories-grid">
                    <NuxtLink
                        v-for="category in categories"
                        :key="category.id"
                        :to="{ hash: `#${titleCase(category.name)}` }"
                        class="category-card"
                    >
                        <div class="category-image">
                            <img v-if="category.packages[0]?.image" :src="category.packages[0].image" :alt="category.name" />
                            <Icon v-else name="package" size="48px" />
                            <div class="image-overlay"></div>
                        </div>
                        <div class="category-content">
                            <h3>{{ category.name }}</h3>
                            <p>{{ category.packages.length }} resources</p>
                            <div class="category-arrow">
                                <Icon name="arrow-right" size="20px" />
                            </div>
                        </div>
                        <div class="category-glow"></div>
                    </NuxtLink>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="team-section">
            <div class="container">
                <div class="section-header">
                    <h2 class="section-title">Meet Our Team</h2>
                    <p class="section-subtitle">The experts behind your favorite resources</p>
                </div>
                
                <div class="team-grid">
                    <div class="team-member" v-for="(member, index) in teamMembers" :key="index">
                        <div class="member-avatar">
                            <img :src="member.avatar" :alt="member.name" />
                            <div class="avatar-glow"></div>
                        </div>
                        <h3>{{ member.name }}</h3>
                        <p class="member-role">{{ member.role }}</p>
                        <p class="member-description">{{ member.description }}</p>
                        <div class="member-social">
                            <a v-for="social in member.social" :key="social.platform" :href="social.url" class="social-link">
                                <Icon :name="social.platform" size="18px" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Package Categories Display -->
        <div class="container packages-container">
            <div
                v-for="category in categories"
                :key="category.id"
                :id="titleCase(category.name)"
                class="category-section"
            >
                <HeaderCard>
                    <div class="category-header">
                        <div class="category-icon">
                            <img v-if="category.packages[0]?.image" :src="category.packages[0].image" :alt="category.name" />
                            <Icon v-else name="package" size="48px" />
                        </div>
                        <div class="category-info">
                            <h3>{{ category.name }}</h3>
                            <p>{{ category.packages.length }} premium resources available</p>
                        </div>
                    </div>
                </HeaderCard>

                <div class="packages-grid">
                    <div
                        class="package-wrapper"
                        v-for="pkg in category.packages"
                        :key="pkg.id"
                    >
                        <PackageCard :pkg="pkg" hide-options />
                    </div>
                </div>
            </div>
        </div>

        <!-- Footer CTA Section -->
        <section class="footer-cta-section">
            <div class="container">
                <div class="cta-content">
                    <h2>Ready to Elevate Your Server?</h2>
                    <p>Join thousands of satisfied customers and transform your FiveM experience today.</p>
                    <div class="cta-actions">
                        <Button variant="primary" size="lg" class="cta-btn">
                            <Icon name="shopping-cart" size="20px" />
                            Start Shopping
                        </Button>
                        <Button variant="secondary" size="lg" class="cta-btn" :href="appConfig.discordUrl" external>
                            <Icon name="discord" size="20px" />
                            Get Support
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>

    <!-- Login Modal -->
    <NuxtPage />
</template>

<script lang="ts" setup>
const { t } = useI18n();
const appConfig = useAppConfig();

useSeoMeta({
    ogTitle: `${appConfig.storeName} - Premium FiveM Resources`,
    description: "Discover high-quality scripts, vehicles, maps, and exclusive content for your FiveM server. Join thousands of satisfied customers worldwide.",
    ogDescription: "Discover high-quality scripts, vehicles, maps, and exclusive content for your FiveM server. Join thousands of satisfied customers worldwide.",
    ogImage: "/hero-bg.jpg",
    twitterCard: "summary_large_image",
});

const categoryStore = useCategoryStore();
const { data: categories } = await useAsyncData("categories", () => {
    return categoryStore.fetchCategories();
});

const heroStats = [
    { icon: 'users', number: '15K+', label: t('index.stats.customers') },
    { icon: 'package', number: '500+', label: t('index.stats.resources') },
    { icon: 'star', number: '2K+', label: t('index.stats.servers') },
    { icon: 'shield', number: '24/7', label: t('index.stats.support') },
];

const features = [
    {
        icon: 'shield',
        title: 'Secure & Reliable',
        description: 'All our resources are thoroughly tested and secured for your peace of mind.'
    },
    {
        icon: 'zap',
        title: 'High Performance',
        description: 'Optimized code ensures your server runs smoothly with minimal resource usage.'
    },
    {
        icon: 'users',
        title: 'Expert Support',
        description: '24/7 support from our experienced team of FiveM developers.'
    },
    {
        icon: 'star',
        title: 'Premium Quality',
        description: 'Hand-crafted resources that exceed industry standards and expectations.'
    },
    {
        icon: 'check-circle',
        title: 'Regular Updates',
        description: 'Continuous improvements and new features to keep your server fresh.'
    },
    {
        icon: 'award',
        title: 'Satisfaction Guaranteed',
        description: 'Money-back guarantee if you\'re not completely satisfied with your purchase.'
    },
];

const teamMembers = [
    {
        name: 'Alex Johnson',
        role: 'Lead Developer',
        description: 'Full-stack developer with 5+ years of FiveM experience.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        social: [
            { platform: 'discord', url: '#' },
            { platform: 'github', url: '#' },
        ]
    },
    {
        name: 'Sarah Chen',
        role: 'UI/UX Designer',
        description: 'Creative designer specializing in gaming interfaces.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        social: [
            { platform: 'discord', url: '#' },
            { platform: 'twitter', url: '#' },
        ]
    },
    {
        name: 'Mike Rodriguez',
        role: 'Backend Engineer',
        description: 'Server optimization and database management expert.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        social: [
            { platform: 'discord', url: '#' },
            { platform: 'github', url: '#' },
        ]
    },
];

const getParticleStyle = (index: number) => {
    const delay = Math.random() * 20;
    const duration = 15 + Math.random() * 10;
    const size = 2 + Math.random() * 4;
    
    return {
        left: Math.random() * 100 + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
        width: size + 'px',
        height: size + 'px',
    };
};
</script>

<style scoped lang="scss">
@use "~/assets/styles/settings" as *;
@use "~/assets/styles/tools";

.modern-fivem-store {
    padding-top: 80px; // Account for fixed header
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
    background: linear-gradient(135deg, 
        rgba(99, 102, 241, 0.1) 0%, 
        rgba(16, 185, 129, 0.1) 50%,
        rgba(139, 92, 246, 0.1) 100%
    );
}

.hero-particles {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    
    .particle {
        position: absolute;
        background: linear-gradient(45deg, $primary, $success);
        border-radius: 50%;
        opacity: 0.6;
        animation: float infinite linear;
    }
}

.hero-waves {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 200px;
    
    .wave {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 200%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
        animation: wave 20s infinite linear;
        
        &.wave-1 {
            animation-duration: 20s;
            opacity: 0.3;
        }
        
        &.wave-2 {
            animation-duration: 15s;
            animation-delay: -5s;
            opacity: 0.2;
        }
        
        &.wave-3 {
            animation-duration: 25s;
            animation-delay: -10s;
            opacity: 0.1;
        }
    }
}

.hero-container {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1fr;
    gap: 4rem;
    align-items: center;
    
    @include tools.media-breakpoint-up("lg") {
        grid-template-columns: 1fr 1fr;
    }
}

.hero-content {
    text-align: center;
    
    @include tools.media-breakpoint-up("lg") {
        text-align: left;
    }
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 50px;
    color: $primary;
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 2rem;
    position: relative;
    overflow: hidden;
    
    .badge-glow {
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 3s infinite;
    }
}

.hero-title {
    font-size: 3rem;
    font-weight: 900;
    line-height: 1.1;
    margin: 0 0 2rem 0;
    
    @include tools.media-breakpoint-up("md") {
        font-size: 4rem;
    }
    
    @include tools.media-breakpoint-up("lg") {
        font-size: 5rem;
    }
    
    .title-line {
        display: block;
        animation: slideInUp 1s ease-out;
        
        &--1 {
            background: linear-gradient(135deg, $primary 0%, $success 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation-delay: 0.2s;
        }
        
        &--2 {
            color: $text-high-emphasis-color;
            font-size: 0.6em;
            font-weight: 400;
            animation-delay: 0.4s;
        }
    }
}

.hero-description {
    font-size: 1.25rem;
    color: $text-medium-emphasis-color;
    line-height: 1.6;
    margin: 0 0 3rem 0;
    max-width: 600px;
    animation: slideInUp 1s ease-out 0.6s both;
}

.hero-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 4rem;
    flex-wrap: wrap;
    animation: slideInUp 1s ease-out 0.8s both;
    
    @include tools.media-breakpoint-up("lg") {
        justify-content: flex-start;
    }
}

.hero-btn {
    position: relative;
    overflow: hidden;
    min-width: 180px;
    
    &--primary {
        .btn-glow {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            animation: shimmer 2s infinite;
        }
        
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
        }
    }
    
    &--secondary {
        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(16, 185, 129, 0.3);
        }
    }
}

.hero-stats {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    animation: slideInUp 1s ease-out 1s both;
    
    @include tools.media-breakpoint-up("md") {
        grid-template-columns: repeat(4, 1fr);
    }
}

.stat-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &:hover {
        background: rgba(99, 102, 241, 0.1);
        border-color: rgba(99, 102, 241, 0.3);
        transform: translateY(-2px);
    }
    
    .stat-icon {
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    
    .stat-content {
        display: flex;
        flex-direction: column;
        
        .stat-number {
            font-size: 1.5rem;
            font-weight: 700;
            color: $text-high-emphasis-color;
        }
        
        .stat-label {
            font-size: 0.875rem;
            color: $text-medium-emphasis-color;
        }
    }
}

// Hero Visual
.hero-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    animation: slideInRight 1s ease-out 0.4s both;
}

.visual-container {
    position: relative;
    width: 400px;
    height: 400px;
}

.floating-card {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    color: $text-high-emphasis-color;
    font-weight: 600;
    animation: floatCard 6s ease-in-out infinite;
    
    &--1 {
        top: 20%;
        left: 10%;
        animation-delay: 0s;
    }
    
    &--2 {
        top: 10%;
        right: 20%;
        animation-delay: 2s;
    }
    
    &--3 {
        bottom: 20%;
        left: 20%;
        animation-delay: 4s;
    }
}

.main-visual {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background: linear-gradient(135deg, $primary 0%, $success 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    animation: pulse 4s ease-in-out infinite;
    
    .visual-glow {
        position: absolute;
        top: -20px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        border-radius: 50%;
        opacity: 0.3;
        animation: glow 3s ease-in-out infinite alternate;
    }
}

// Features Section
.features-section {
    padding: 8rem 0;
    background: linear-gradient(135deg, $background-200 0%, $background-100 100%);
}

.section-header {
    text-align: center;
    margin-bottom: 4rem;
    
    .section-title {
        font-size: 3rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin: 0 0 1rem 0;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .section-subtitle {
        font-size: 1.25rem;
        color: $text-medium-emphasis-color;
        margin: 0;
    }
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.feature-card {
    position: relative;
    padding: 2rem;
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    overflow: hidden;
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        border-color: rgba(99, 102, 241, 0.4);
        
        .feature-hover-effect {
            opacity: 1;
            transform: scale(1);
        }
        
        .icon-glow {
            opacity: 1;
        }
    }
    
    .feature-icon {
        position: relative;
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        margin: 0 auto 1.5rem;
        
        .icon-glow {
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(135deg, $primary 0%, $success 100%);
            border-radius: 25px;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
            filter: blur(15px);
        }
    }
    
    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin: 0 0 1rem 0;
    }
    
    p {
        color: $text-medium-emphasis-color;
        line-height: 1.6;
        margin: 0;
    }
    
    .feature-hover-effect {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(16, 185, 129, 0.1) 100%);
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
        border-radius: 20px;
        z-index: -1;
    }
}

// Categories Section
.categories-section {
    padding: 8rem 0;
    background: $background-100;
}

.categories-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.category-card {
    position: relative;
    display: block;
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    overflow: hidden;
    text-decoration: none;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        border-color: rgba(99, 102, 241, 0.4);
        text-decoration: none;
        
        .image-overlay {
            opacity: 1;
        }
        
        .category-arrow {
            transform: translateX(8px);
        }
        
        .category-glow {
            opacity: 1;
        }
    }
    
    .category-image {
        position: relative;
        height: 200px;
        background: $c-300;
        overflow: hidden;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.4s ease;
        }
        
        .image-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(16, 185, 129, 0.8) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 3rem;
        }
    }
    
    .category-content {
        padding: 2rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        h3 {
            font-size: 1.25rem;
            font-weight: 700;
            color: $text-high-emphasis-color;
            margin: 0 0 0.5rem 0;
        }
        
        p {
            color: $text-medium-emphasis-color;
            margin: 0;
        }
        
        .category-arrow {
            color: $primary;
            transition: transform 0.3s ease;
        }
    }
    
    .category-glow {
        position: absolute;
        top: -2px;
        left: -2px;
        right: -2px;
        bottom: -2px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        border-radius: 22px;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: -1;
        filter: blur(10px);
    }
}

// Team Section
.team-section {
    padding: 8rem 0;
    background: linear-gradient(135deg, $background-200 0%, $background-100 100%);
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}

.team-member {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    transition: all 0.3s ease;
    
    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        
        .avatar-glow {
            opacity: 1;
        }
    }
    
    .member-avatar {
        position: relative;
        width: 120px;
        height: 120px;
        margin: 0 auto 1.5rem;
        
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
        
        .avatar-glow {
            position: absolute;
            top: -10px;
            left: -10px;
            right: -10px;
            bottom: -10px;
            background: linear-gradient(135deg, $primary 0%, $success 100%);
            border-radius: 50%;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: -1;
            filter: blur(15px);
        }
    }
    
    h3 {
        font-size: 1.5rem;
        font-weight: 700;
        color: $text-high-emphasis-color;
        margin: 0 0 0.5rem 0;
    }
    
    .member-role {
        color: $primary;
        font-weight: 600;
        margin: 0 0 1rem 0;
    }
    
    .member-description {
        color: $text-medium-emphasis-color;
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
    }
    
    .member-social {
        display: flex;
        justify-content: center;
        gap: 1rem;
        
        .social-link {
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: $text-medium-emphasis-color;
            text-decoration: none;
            transition: all 0.3s ease;
            
            &:hover {
                background: $primary;
                color: white;
                transform: translateY(-2px);
            }
        }
    }
}

// Packages Container
.packages-container {
    padding: 4rem 0;
}

.category-section {
    margin-bottom: 6rem;
}

.category-header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    
    .category-icon {
        width: 60px;
        height: 60px;
        border-radius: 16px;
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
    
    .category-info {
        h3 {
            font-size: 2rem;
            font-weight: 700;
            color: $text-high-emphasis-color;
            margin: 0 0 0.5rem 0;
        }
        
        p {
            color: $text-medium-emphasis-color;
            margin: 0;
        }
    }
}

.packages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-top: 2rem;
}

.package-wrapper {
    height: 100%;
}

// Footer CTA Section
.footer-cta-section {
    padding: 8rem 0;
    background: linear-gradient(135deg, $primary 0%, $success 100%);
    color: white;
    text-align: center;
    
    .cta-content {
        max-width: 600px;
        margin: 0 auto;
        
        h2 {
            font-size: 3rem;
            font-weight: 700;
            margin: 0 0 1rem 0;
        }
        
        p {
            font-size: 1.25rem;
            margin: 0 0 3rem 0;
            opacity: 0.9;
        }
    }
    
    .cta-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }
    
    .cta-btn {
        min-width: 180px;
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        
        &:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-3px);
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
        }
    }
}

// Animations
@keyframes float {
    0% { transform: translateY(0px) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
}

@keyframes wave {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

@keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes floatCard {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

@keyframes pulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50% { transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes glow {
    0% { opacity: 0.3; }
    100% { opacity: 0.6; }
}
</style>