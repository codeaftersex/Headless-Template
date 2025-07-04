<template>
    <div class="announcement-card">
        <div class="announcement-card__header">
            <div class="announcement-card__badge">
                <Icon name="megaphone" size="16px" />
                <span>Duyuru</span>
            </div>
            <span class="announcement-card__date">{{ formatDate(date) }}</span>
        </div>
        <h4 class="announcement-card__title">{{ title }}</h4>
        <p class="announcement-card__content">{{ content }}</p>
        <Button 
            v-if="link" 
            variant="clear" 
            size="sm" 
            :to="link"
            class="announcement-card__link"
        >
            Devamını Oku
            <Icon name="arrow-right" size="16px" />
        </Button>
    </div>
</template>

<script setup lang="ts">
interface AnnouncementProps {
    title: string;
    content: string;
    date: string;
    link?: string;
}

defineProps<AnnouncementProps>();

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('tr-TR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.announcement-card {
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border-radius: 16px;
    padding: 20px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-2px);
        border-color: rgba(99, 102, 241, 0.3);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
    }

    &__badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.75rem;
        font-weight: 600;
    }

    &__date {
        color: $text-medium-emphasis-color;
        font-size: 0.75rem;
    }

    &__title {
        color: $text-high-emphasis-color;
        font-size: 1.125rem;
        font-weight: 600;
        margin: 0 0 8px 0;
    }

    &__content {
        color: $text-medium-emphasis-color;
        font-size: 0.875rem;
        line-height: 1.5;
        margin: 0 0 16px 0;
    }

    &__link {
        color: $primary;
        font-weight: 600;
        display: flex;
        align-items: center;
        gap: 6px;
        
        &:hover {
            color: $primary-dark;
        }
    }
}
</style>