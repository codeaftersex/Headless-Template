<template>
    <div class="package-docs">
        <div class="package-docs__header">
            <h3>Paket Dokümantasyonu</h3>
            <div class="package-docs__tabs">
                <button 
                    v-for="tab in tabs"
                    :key="tab.id"
                    class="package-docs__tab"
                    :class="{ 'package-docs__tab--active': activeTab === tab.id }"
                    @click="activeTab = tab.id"
                >
                    <Icon :name="tab.icon" size="16px" />
                    {{ tab.label }}
                </button>
            </div>
        </div>
        
        <div class="package-docs__content">
            <div v-if="activeTab === 'features'" class="package-docs__section">
                <h4>Özellikler</h4>
                <ul class="package-docs__features">
                    <li v-for="feature in documentation.features" :key="feature">
                        <Icon name="check" size="16px" />
                        {{ feature }}
                    </li>
                </ul>
            </div>

            <div v-if="activeTab === 'commands'" class="package-docs__section">
                <h4>Komutlar</h4>
                <div class="package-docs__commands">
                    <div v-for="command in documentation.commands" :key="command.command" class="package-docs__command">
                        <code>{{ command.command }}</code>
                        <p>{{ command.description }}</p>
                    </div>
                </div>
            </div>

            <div v-if="activeTab === 'permissions'" class="package-docs__section">
                <h4>İzinler</h4>
                <div class="package-docs__permissions">
                    <div v-for="permission in documentation.permissions" :key="permission.permission" class="package-docs__permission">
                        <code>{{ permission.permission }}</code>
                        <p>{{ permission.description }}</p>
                    </div>
                </div>
            </div>

            <div v-if="activeTab === 'installation'" class="package-docs__section">
                <h4>Kurulum Rehberi</h4>
                <div class="package-docs__steps">
                    <div v-for="(step, index) in documentation.installation" :key="index" class="package-docs__step">
                        <div class="package-docs__step-number">{{ index + 1 }}</div>
                        <div class="package-docs__step-content">
                            <h5>{{ step.title }}</h5>
                            <p>{{ step.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface Documentation {
    features: string[];
    commands: Array<{ command: string; description: string; }>;
    permissions: Array<{ permission: string; description: string; }>;
    installation: Array<{ title: string; description: string; }>;
}

interface PackageDocumentationProps {
    documentation: Documentation;
}

defineProps<PackageDocumentationProps>();

const activeTab = ref('features');

const tabs = [
    { id: 'features', label: 'Özellikler', icon: 'star' },
    { id: 'commands', label: 'Komutlar', icon: 'terminal' },
    { id: 'permissions', label: 'İzinler', icon: 'shield' },
    { id: 'installation', label: 'Kurulum', icon: 'download' },
];
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.package-docs {
    background: linear-gradient(135deg, $c-100 0%, $c-200 100%);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    overflow: hidden;

    &__header {
        padding: 24px 24px 0 24px;

        h3 {
            color: $text-high-emphasis-color;
            font-size: 1.25rem;
            font-weight: 600;
            margin: 0 0 20px 0;
        }
    }

    &__tabs {
        display: flex;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    &__tab {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        background: none;
        border: none;
        color: $text-medium-emphasis-color;
        font-size: 0.875rem;
        cursor: pointer;
        transition: all 0.3s ease;
        border-bottom: 2px solid transparent;

        &:hover {
            color: $text-high-emphasis-color;
            background: rgba(255, 255, 255, 0.05);
        }

        &--active {
            color: $primary;
            border-bottom-color: $primary;
        }
    }

    &__content {
        padding: 24px;
    }

    &__section {
        h4 {
            color: $text-high-emphasis-color;
            font-size: 1.125rem;
            font-weight: 600;
            margin: 0 0 16px 0;
        }
    }

    &__features {
        list-style: none;
        padding: 0;
        margin: 0;

        li {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 8px 0;
            color: $text-medium-emphasis-color;

            svg {
                color: $success;
            }
        }
    }

    &__commands,
    &__permissions {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    &__command,
    &__permission {
        padding: 16px;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 12px;

        code {
            display: inline-block;
            background: rgba(99, 102, 241, 0.2);
            color: $primary;
            padding: 4px 8px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', monospace;
            font-size: 0.875rem;
            margin-bottom: 8px;
        }

        p {
            color: $text-medium-emphasis-color;
            margin: 0;
            line-height: 1.5;
        }
    }

    &__steps {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    &__step {
        display: flex;
        gap: 16px;
    }

    &__step-number {
        width: 32px;
        height: 32px;
        background: linear-gradient(135deg, $primary 0%, $success 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 700;
        font-size: 0.875rem;
        flex-shrink: 0;
    }

    &__step-content {
        flex: 1;

        h5 {
            color: $text-high-emphasis-color;
            font-size: 1rem;
            font-weight: 600;
            margin: 0 0 8px 0;
        }

        p {
            color: $text-medium-emphasis-color;
            margin: 0;
            line-height: 1.5;
        }
    }
}
</style>