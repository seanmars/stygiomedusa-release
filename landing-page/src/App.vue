<script setup lang="ts">
import BackToTop from '@/components/BackToTop.vue'
import HeroSection from '@/components/HeroSection.vue'
import InstallSection from '@/components/InstallSection.vue'
import PaceSection from '@/components/PaceSection.vue'
import PopupSection from '@/components/PopupSection.vue'
import PrivacySection from '@/components/PrivacySection.vue'
import ProfilesSection from '@/components/ProfilesSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SlimeSection from '@/components/SlimeSection.vue'
import UsageSection from '@/components/UsageSection.vue'
import WidgetSection from '@/components/WidgetSection.vue'
</script>

<template>
  <div id="top">
    <SiteHeader />
    <main>
      <HeroSection />
      <WidgetSection />
      <SlimeSection />
      <PopupSection />
      <PaceSection />
      <UsageSection />
      <ProfilesSection />
      <PrivacySection />
      <InstallSection />
    </main>
    <SiteFooter />
    <BackToTop />
  </div>
</template>
