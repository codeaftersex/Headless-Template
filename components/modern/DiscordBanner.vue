<template>
    <div class="discord-banner">
        <div class="discord-banner__background">
            <div class="discord-banner__pattern"></div>
        </div>
        <div class="discord-banner__content">
            <div class="discord-banner__icon">
                <Icon name="discord" size="32px" />
            </div>
            <div class="discord-banner__text">
                <h3>Discord Topluluğumuza Katıl!</h3>
                <p>En son güncellemeler, etkinlikler ve topluluk desteği için Discord sunucumuza katıl.</p>
                <div class="discord-banner__stats">
                    <div class="discord-banner__stat">
                        <Icon name="users" size="16px" />
                        <span>{{ onlineMembers }} Çevrimiçi</span>
                    </div>
                    <div class="discord-banner__stat">
                        <Icon name="message-circle" size="16px" />
                        <span>{{ totalMembers }} Üye</span>
                    </div>
                </div>
            </div>
            <Button 
                variant="primary" 
                size="lg"
                :href="discordUrl"
                external
                class="discord-banner__button"
            >
                <Icon name="discord" size="20px" />
                Katıl
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
interface DiscordBannerProps {
    discordUrl: string;
    onlineMembers?: number;
    totalMembers?: number;
}

withDefaults(defineProps<DiscordBannerProps>(), {
    onlineMembers: 1247,
    totalMembers: 8932,
});
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.discord-banner {
    position: relative;
    background: linear-gradient(135deg, #5865f2 0%, #7289da 100%);
    border-radius: 20px;
    padding: 32px;
    overflow: hidden;
    color: white;

    &__background {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 0.1;
    }

    &__pattern {
        position: absolute;
        top: -50%;
        right: -20%;
        width: 200px;
        height: 200px;
        background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
        animation: float 20s ease-in-out infinite;
    }

    &__content {
        position: relative;
        display: flex;
        align-items: center;
        gap: 24px;
    }

    &__icon {
        width: 64px;
        height: 64px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
    }

    &__text {
        flex: 1;

        h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 0 0 8px 0;
        }

        p {
            opacity: 0.9;
            margin: 0 0 16px 0;
            line-height: 1.5;
        }
    }

    &__stats {
        display: flex;
        gap: 24px;
    }

    &__stat {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 0.875rem;
        opacity: 0.9;
    }

    &__button {
        background: rgba(255, 255, 255, 0.2);
        border: 1px solid rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        
        &:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
        }
    }
}

@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
}
</style>