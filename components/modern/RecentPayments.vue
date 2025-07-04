<template>
    <div class="recent-payments">
        <div class="recent-payments__header">
            <h3>Son Ödemeler</h3>
            <Button variant="clear" size="sm">
                Tümünü Gör
                <Icon name="arrow-right" size="16px" />
            </Button>
        </div>
        <div class="recent-payments__list">
            <div 
                v-for="payment in payments" 
                :key="payment.id"
                class="recent-payments__item"
            >
                <div class="recent-payments__status" :class="`recent-payments__status--${payment.status}`">
                    <Icon :name="getStatusIcon(payment.status)" size="16px" />
                </div>
                <div class="recent-payments__info">
                    <h4>{{ payment.packageName }}</h4>
                    <p>{{ payment.username }} • {{ formatDate(payment.date) }}</p>
                </div>
                <div class="recent-payments__amount">
                    <span>{{ $n(payment.amount, 'currency') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Payment {
    id: string;
    packageName: string;
    username: string;
    amount: number;
    date: string;
    status: 'completed' | 'pending' | 'failed';
}

interface RecentPaymentsProps {
    payments?: Payment[];
}

const props = withDefaults(defineProps<RecentPaymentsProps>(), {
    payments: () => [
        { id: '1', packageName: 'VIP Paketi', username: 'ProGamer123', amount: 49.99, date: '2024-01-15T10:30:00Z', status: 'completed' },
        { id: '2', packageName: 'Premium Rank', username: 'MinecraftKing', amount: 29.99, date: '2024-01-15T09:15:00Z', status: 'completed' },
        { id: '3', packageName: 'Starter Kit', username: 'BuilderPro', amount: 9.99, date: '2024-01-15T08:45:00Z', status: 'pending' },
        { id: '4', packageName: 'Elite Package', username: 'RedstoneWiz', amount: 99.99, date: '2024-01-14T22:30:00Z', status: 'completed' },
        { id: '5', packageName: 'Basic Rank', username: 'PvPMaster', amount: 19.99, date: '2024-01-14T20:15:00Z', status: 'failed' },
    ]
});

const getStatusIcon = (status: string) => {
    const icons = {
        completed: 'check-circle',
        pending: 'clock',
        failed: 'x-circle'
    };
    return icons[status as keyof typeof icons] || 'circle';
};

const formatDate = (date: string) => {
    const now = new Date();
    const paymentDate = new Date(date);
    const diffInHours = Math.floor((now.getTime() - paymentDate.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Az önce';
    if (diffInHours < 24) return `${diffInHours} saat önce`;
    return `${Math.floor(diffInHours / 24)} gün önce`;
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.recent-payments {
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;

        h3 {
            color: $text-high-emphasis-color;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0;
        }
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;
        transition: all 0.3s ease;

        &:hover {
            background: rgba(255, 255, 255, 0.1);
        }
    }

    &__status {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &--completed {
            background: rgba(16, 185, 129, 0.2);
            color: $success;
        }

        &--pending {
            background: rgba(245, 158, 11, 0.2);
            color: #f59e0b;
        }

        &--failed {
            background: rgba(239, 68, 68, 0.2);
            color: $danger;
        }
    }

    &__info {
        flex: 1;

        h4 {
            color: $text-high-emphasis-color;
            font-size: 0.875rem;
            font-weight: 600;
            margin: 0 0 2px 0;
        }

        p {
            color: $text-medium-emphasis-color;
            font-size: 0.75rem;
            margin: 0;
        }
    }

    &__amount {
        span {
            color: $success;
            font-weight: 700;
            font-size: 0.875rem;
        }
    }
}
</style>