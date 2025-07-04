<template>
    <div class="package-gallery">
        <div class="package-gallery__main">
            <div class="package-gallery__main-media">
                <video 
                    v-if="currentMedia.type === 'video'"
                    :src="currentMedia.url"
                    controls
                    class="package-gallery__video"
                    @loadedmetadata="onVideoLoaded"
                >
                </video>
                <img 
                    v-else
                    :src="currentMedia.url"
                    :alt="currentMedia.alt"
                    class="package-gallery__image"
                />
            </div>
            <div class="package-gallery__overlay">
                <Button 
                    v-if="currentMedia.type === 'video'"
                    variant="clear"
                    class="package-gallery__play-btn"
                    @click="toggleVideo"
                >
                    <Icon :name="isPlaying ? 'pause' : 'play'" size="24px" />
                </Button>
            </div>
        </div>
        
        <div class="package-gallery__thumbnails">
            <div 
                v-for="(media, index) in mediaItems"
                :key="index"
                class="package-gallery__thumbnail"
                :class="{ 'package-gallery__thumbnail--active': index === currentIndex }"
                @click="setCurrentMedia(index)"
            >
                <img :src="media.thumbnail" :alt="media.alt" />
                <div v-if="media.type === 'video'" class="package-gallery__video-indicator">
                    <Icon name="play" size="16px" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
interface MediaItem {
    type: 'image' | 'video';
    url: string;
    thumbnail: string;
    alt: string;
}

interface PackageGalleryProps {
    mediaItems: MediaItem[];
}

const props = defineProps<PackageGalleryProps>();

const currentIndex = ref(0);
const isPlaying = ref(false);
const videoRef = ref<HTMLVideoElement | null>(null);

const currentMedia = computed(() => props.mediaItems[currentIndex.value]);

const setCurrentMedia = (index: number) => {
    currentIndex.value = index;
    isPlaying.value = false;
};

const toggleVideo = () => {
    const video = document.querySelector('.package-gallery__video') as HTMLVideoElement;
    if (video) {
        if (isPlaying.value) {
            video.pause();
        } else {
            video.play();
        }
        isPlaying.value = !isPlaying.value;
    }
};

const onVideoLoaded = () => {
    const video = document.querySelector('.package-gallery__video') as HTMLVideoElement;
    if (video) {
        video.addEventListener('play', () => isPlaying.value = true);
        video.addEventListener('pause', () => isPlaying.value = false);
    }
};
</script>

<style lang="scss" scoped>
@use "~/assets/styles/settings" as *;

.package-gallery {
    &__main {
        position: relative;
        border-radius: 16px;
        overflow: hidden;
        margin-bottom: 16px;
        background: $c-200;
        aspect-ratio: 16/9;
    }

    &__main-media {
        width: 100%;
        height: 100%;
    }

    &__video,
    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        opacity: 0;
        transition: opacity 0.3s ease;

        &:hover {
            opacity: 1;
        }
    }

    &__play-btn {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.9);
        color: $c-900;
        
        &:hover {
            background: white;
            transform: scale(1.1);
        }
    }

    &__thumbnails {
        display: flex;
        gap: 12px;
        overflow-x: auto;
        padding: 4px;
    }

    &__thumbnail {
        position: relative;
        width: 80px;
        height: 60px;
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: all 0.3s ease;
        flex-shrink: 0;

        &:hover {
            transform: scale(1.05);
        }

        &--active {
            border-color: $primary;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__video-indicator {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
}
</style>