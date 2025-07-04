<template>
    <div class="top-customers">
        <div class="top-customers__header">
            <h3>En İyi Müşteriler</h3>
            <Button variant="clear" size="sm">
                Tümünü Gör
                <Icon name="arrow-right" size="16px" />
            </Button>
        </div>
        <div class="top-customers__list">
            <div 
                v-for="(customer, index) in customers" 
                :key="customer.id"
                class="top-customers__item"
            >
                <div class="top-customers__rank">
                    <span class="top-customers__position">{{ index + 1 }}</span>
                    <div v-if="index < 3" class="top-customers__medal" :class="`top-customers__medal--${getMedalType(index)}`">
                        <Icon :name="getMedalIcon(index)" size="16px" />
                    </div>
                </div>
                <Avatar :user="customer" :width="40" :height="40" />
                <div class="top-customers__info">
                    <h4>{{ customer.username }}</h4>
                    <p>{{ $n(customer.totalSpent, 'currency') }}</p>
                </div>
                <div class="top-customers__badge">
                    <Icon name="crown" size="14px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Customer {
    id: string;
    username: string;
    totalSpent: number;
}

interface TopCustomersProps {
    customers?: Customer[];
}

const props = withDefaults(defineProps<TopCustomersProps>(), {
    customers: () => [
        { id: '1', username: 'ProGamer123', totalSpent: 2450.00 },
        { id: '2', username: 'MinecraftKing', totalSpent: 1890.50 },
        { id: '3', username: 'BuilderPro', totalSpent: 1650.25 },
        { id: '4', username: 'RedstoneWiz', totalSpent: 1420.75 },
        { id: '5', username: 'PvPMaster', totalSpent: 1180.00 },
    ]
});

const getMedalType = (index: number) => {
    const types = ['gold', 'silver', 'bronze'];
    return types[index];
};

const getMedalIcon = (index: number) => {
    const icons = ['trophy', 'award', 'medal'];
    return icons[index];
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.top-customers {
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
            transform: translateX(4px);
        }
    }

    &__rank {
        position: relative;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__position {
        font-weight: 700;
        color: $text-medium-emphasis-color;
        font-size: 0.875rem;
    }

    &__medal {
        position: absolute;
        top: -4px;
        right: -4px;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 10px;

        &--gold {
            background: linear-gradient(135deg, #ffd700 0%, #ffed4e 100%);
            color: #b45309;
        }

        &--silver {
            background: linear-gradient(135deg, #c0c0c0 0%, #e5e7eb 100%);
            color: #374151;
        }

        &--bronze {
            background: linear-gradient(135deg, #cd7f32 0%, #d97706 100%);
            color: #ffffff;
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
            color: $success;
            font-size: 0.75rem;
            font-weight: 600;
            margin: 0;
        }
    }

    &__badge {
        color: #ffd700;
        opacity: 0.7;
    }
}
</style>