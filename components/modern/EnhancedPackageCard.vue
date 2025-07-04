<template>
    <div :class="classes" :style="style">
        <div class="enhanced-package-card__inner">
            <!-- Discount Badge -->
            <DiscountBadge 
                v-if="pkg.discount"
                :discount="pkg.discount"
                :timeLeft="timeLeft"
                :variant="pkg.discount > 50 ? 'hot' : 'default'"
            />

            <!-- Media Gallery -->
            <div class="enhanced-package-card__media" @click="openModal">
                <PackageGallery 
                    v-if="mediaItems.length > 0"
                    :mediaItems="mediaItems"
                />
                <div v-else class="enhanced-package-card__image">
                    <img v-if="pkg.image" :src="pkg.image" :alt="pkg.name" />
                </div>
                <div class="enhanced-package-card__overlay">
                    <Icon name="eye" size="24px" />
                    <span>Detayları Gör</span>
                </div>
            </div>

            <!-- Package Info -->
            <div class="enhanced-package-card__content">
                <div class="enhanced-package-card__header">
                    <h3>{{ pkg.name }}</h3>
                    <div class="enhanced-package-card__rating">
                        <div class="stars">
                            <Icon v-for="i in 5" :key="i" name="star" size="14px" 
                                  :class="{ 'star--filled': i <= rating }" />
                        </div>
                        <span>({{ reviewCount }})</span>
                    </div>
                </div>

                <div class="enhanced-package-card__price">
                    <span v-if="pkg.discount" class="original-price">
                        {{ $n(pkg.base_price, 'currency') }}
                    </span>
                    <span class="current-price">
                        {{ $n(pkg.total_price, 'currency') }}
                    </span>
                </div>

                <p v-if="showDescription && pkg.description" class="enhanced-package-card__description">
                    {{ truncateText(pkg.description, 100) }}
                </p>

                <!-- Features Preview -->
                <div v-if="features.length > 0" class="enhanced-package-card__features">
                    <div v-for="feature in features.slice(0, 3)" :key="feature" class="feature-item">
                        <Icon name="check" size="14px" />
                        <span>{{ feature }}</span>
                    </div>
                    <div v-if="features.length > 3" class="feature-more">
                        +{{ features.length - 3 }} özellik daha
                    </div>
                </div>

                <!-- Actions -->
                <div class="enhanced-package-card__actions">
                    <Button 
                        variant="primary" 
                        block
                        @click="addToCart"
                        :loading="loading?.addToCart"
                    >
                        <Icon name="shopping-cart" size="16px" />
                        Sepete Ekle
                    </Button>
                    <div class="action-buttons">
                        <Button 
                            variant="clear" 
                            size="sm"
                            @click="openModal"
                            class="action-btn"
                        >
                            <Icon name="eye" size="16px" />
                        </Button>
                        <Button 
                            v-if="!pkg.disable_gifting"
                            variant="clear" 
                            size="sm"
                            @click="giftPackage"
                            class="action-btn"
                        >
                            <Icon name="gift" size="16px" />
                        </Button>
                        <Button 
                            variant="clear" 
                            size="sm"
                            @click="toggleWishlist"
                            class="action-btn"
                            :class="{ 'action-btn--active': isWishlisted }"
                        >
                            <Icon name="heart" size="16px" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Enhanced Modal -->
        <Modal v-model="showModal" width="900px">
            <div class="package-modal">
                <div class="package-modal__header">
                    <h2>{{ pkg.name }}</h2>
                    <div class="package-modal__price">
                        <span v-if="pkg.discount" class="original-price">
                            {{ $n(pkg.base_price, 'currency') }}
                        </span>
                        <span class="current-price">
                            {{ $n(pkg.total_price, 'currency') }}
                        </span>
                    </div>
                </div>

                <div class="package-modal__content">
                    <div class="package-modal__media">
                        <PackageGallery :mediaItems="mediaItems" />
                    </div>

                    <div class="package-modal__info">
                        <div class="package-modal__description">
                            <h4>Açıklama</h4>
                            <p>{{ pkg.description }}</p>
                        </div>

                        <PackageDocumentation :documentation="documentation" />
                    </div>
                </div>

                <div class="package-modal__actions">
                    <Button 
                        variant="primary" 
                        size="lg"
                        @click="addToCart"
                        :loading="loading?.addToCart"
                    >
                        <Icon name="shopping-cart" size="20px" />
                        {{ $n(pkg.total_price, 'currency') }} - Sepete Ekle
                    </Button>
                    <Button 
                        v-if="!pkg.disable_gifting"
                        variant="secondary" 
                        size="lg"
                        @click="giftPackage"
                    >
                        <Icon name="gift" size="20px" />
                        Hediye Et
                    </Button>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script setup lang="ts">
import type { Package } from "~/types";

interface EnhancedPackageCardProps {
    pkg: Package;
    showDescription?: boolean;
    timeLeft?: number;
    rating?: number;
    reviewCount?: number;
    features?: string[];
    mediaItems?: Array<{
        type: 'image' | 'video';
        url: string;
        thumbnail: string;
        alt: string;
    }>;
    documentation?: {
        features: string[];
        commands: Array<{ command: string; description: string; }>;
        permissions: Array<{ permission: string; description: string; }>;
        installation: Array<{ title: string; description: string; }>;
    };
}

const props = withDefaults(defineProps<EnhancedPackageCardProps>(), {
    showDescription: true,
    rating: 4.8,
    reviewCount: 127,
    features: () => [
        'Premium özellikler',
        'Özel komutlar',
        'VIP desteği',
        'Özel içerikler',
        'Sınırsız erişim'
    ],
    mediaItems: () => [
        {
            type: 'image',
            url: '/package-images/vip-1.jpg',
            thumbnail: '/package-images/vip-1-thumb.jpg',
            alt: 'VIP Package Preview'
        },
        {
            type: 'video',
            url: '/package-videos/vip-demo.mp4',
            thumbnail: '/package-videos/vip-demo-thumb.jpg',
            alt: 'VIP Package Demo Video'
        }
    ],
    documentation: () => ({
        features: [
            'Premium rank ve özel prefix',
            'Özel komutlar ve yetkiler',
            'VIP spawn alanına erişim',
            'Günlük bonus ödüller',
            'Özel chat renkleri'
        ],
        commands: [
            { command: '/vip spawn', description: 'VIP spawn alanına ışınlanır' },
            { command: '/vip kit', description: 'Günlük VIP kit alır' },
            { command: '/vip fly', description: 'Uçma modunu açar/kapatır' }
        ],
        permissions: [
            { permission: 'vip.spawn', description: 'VIP spawn kullanma izni' },
            { permission: 'vip.kit', description: 'VIP kit alma izni' },
            { permission: 'vip.fly', description: 'Uçma izni' }
        ],
        installation: [
            { title: 'Satın Alma', description: 'Paketi satın aldıktan sonra otomatik olarak hesabınıza tanımlanır.' },
            { title: 'Sunucuya Giriş', description: 'Minecraft sunucumuza giriş yapın.' },
            { title: 'Aktivasyon', description: 'Paket otomatik olarak aktif hale gelir, /vip komutunu kullanabilirsiniz.' }
        ]
    })
});

const showModal = ref(false);
const isWishlisted = ref(false);
const loading = reactive({ addToCart: false });

const classes = computed(() => ({
    'enhanced-package-card': true,
    'enhanced-package-card--featured': props.pkg.discount > 30
}));

const style = computed(() => ({}));

const truncateText = (text: string, length: number) => {
    return text.length > length ? text.substring(0, length) + '...' : text;
};

const openModal = () => {
    showModal.value = true;
};

const addToCart = async () => {
    loading.addToCart = true;
    // Add to cart logic
    setTimeout(() => {
        loading.addToCart = false;
    }, 1000);
};

const giftPackage = () => {
    // Gift package logic
};

const toggleWishlist = () => {
    isWishlisted.value = !isWishlisted.value;
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.enhanced-package-card {
    position: relative;
    height: 100%;
    
    &__inner {
        background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
        border-radius: 20px;
        overflow: hidden;
        border: 1px solid rgba(255, 255, 255, 0.1);
        transition: all 0.4s ease;
        height: 100%;
        display: flex;
        flex-direction: column;
        
        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
            border-color: rgba(99, 102, 241, 0.4);
        }
    }
    
    &__media {
        position: relative;
        aspect-ratio: 16/9;
        overflow: hidden;
        cursor: pointer;
        
        &:hover .enhanced-package-card__overlay {
            opacity: 1;
        }
    }
    
    &__image {
        width: 100%;
        height: 100%;
        
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    
    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 8px;
        color: white;
        opacity: 0;
        transition: opacity 0.3s ease;
        
        span {
            font-size: 0.875rem;
            font-weight: 600;
        }
    }
    
    &__content {
        padding: 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
    }
    
    &__header {
        margin-bottom: 16px;
        
        h3 {
            color: $text-high-emphasis-color;
            font-size: 1.25rem;
            font-weight: 700;
            margin: 0 0 8px 0;
        }
    }
    
    &__rating {
        display: flex;
        align-items: center;
        gap: 8px;
        
        .stars {
            display: flex;
            gap: 2px;
            
            .star--filled {
                color: #ffd700;
            }
            
            svg:not(.star--filled) {
                color: $c-500;
            }
        }
        
        span {
            font-size: 0.75rem;
            color: $text-medium-emphasis-color;
        }
    }
    
    &__price {
        margin-bottom: 16px;
        
        .original-price {
            color: $text-medium-emphasis-color;
            text-decoration: line-through;
            font-size: 0.875rem;
            margin-right: 8px;
        }
        
        .current-price {
            color: $success;
            font-size: 1.5rem;
            font-weight: 700;
        }
    }
    
    &__description {
        color: $text-medium-emphasis-color;
        font-size: 0.875rem;
        line-height: 1.5;
        margin-bottom: 16px;
    }
    
    &__features {
        margin-bottom: 20px;
        
        .feature-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 0.75rem;
            color: $text-medium-emphasis-color;
            
            svg {
                color: $success;
            }
        }
        
        .feature-more {
            font-size: 0.75rem;
            color: $primary;
            font-weight: 600;
            margin-top: 8px;
        }
    }
    
    &__actions {
        margin-top: auto;
        
        .action-buttons {
            display: flex;
            gap: 8px;
            margin-top: 12px;
            justify-content: center;
        }
        
        .action-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            
            &:hover {
                background: rgba(99, 102, 241, 0.2);
                color: $primary;
            }
            
            &--active {
                background: rgba(239, 68, 68, 0.2);
                color: $danger;
            }
        }
    }
}

// Modal Styles
.package-modal {
    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 24px;
        
        h2 {
            color: $text-high-emphasis-color;
            font-size: 1.75rem;
            font-weight: 700;
            margin: 0;
        }
    }
    
    &__price {
        .original-price {
            color: $text-medium-emphasis-color;
            text-decoration: line-through;
            font-size: 1rem;
            margin-right: 8px;
        }
        
        .current-price {
            color: $success;
            font-size: 1.75rem;
            font-weight: 700;
        }
    }
    
    &__content {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        margin-bottom: 32px;
        
        @media (max-width: 768px) {
            grid-template-columns: 1fr;
        }
    }
    
    &__info {
        h4 {
            color: $text-high-emphasis-color;
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 12px 0;
        }
        
        p {
            color: $text-medium-emphasis-color;
            line-height: 1.6;
            margin-bottom: 24px;
        }
    }
    
    &__actions {
        display: flex;
        gap: 16px;
        
        @media (max-width: 768px) {
            flex-direction: column;
        }
    }
}
</style>