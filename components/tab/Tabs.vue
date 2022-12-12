<template>
  <div class="tabs">
    <div
      ref="navigation"
      class="tabs__navigation"
    >
      <Tab
        v-for="tab in items"
        :key="tab.name"
        :ref="tabRefs.set"
        :active="isTabActive(tab)"
        v-bind="tab"
        @click="handleTabClick(tab)"
      />
      <span
        :style="indicatorStyle"
        class="active-tab-indicator"
      />
    </div>
    <div class="tabs__view">
      <slot :active-tab="activeTab" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tab from '@/components/tab/Tab.vue';
import { TabProps } from '@/types';
import { onMounted, ref, watch } from 'vue';
import { templateRef, unrefElement, useTemplateRefsList } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    activeTab: string,
    items?: TabProps[]
  }>(),
  {
    items: () => []
  }
);

const navigationRef = templateRef<HTMLDivElement>('navigation');
const tabRefs = useTemplateRefsList<InstanceType<typeof Tab>>();

const defaultIndicatorStyle = {
  width: '0px', left: '0px'
};
const indicatorStyle = ref({ ...defaultIndicatorStyle });

const getActiveTabRef = () => {
  return tabRefs.value.find(isTabActive);
};

onMounted(() => {
  watch(() => props.activeTab, () => {
    const tabElement = unrefElement<HTMLDivElement>(getActiveTabRef());
    const navElement = unrefElement<HTMLDivElement>(navigationRef);

    if (navElement && tabElement) {
      const tabBounds = tabElement.getBoundingClientRect();
      const navBounds = navElement.getBoundingClientRect();

      indicatorStyle.value = {
        width: tabBounds.width + 'px',
        left: tabBounds.x - navBounds.x + 'px',
      };
    } else {
      indicatorStyle.value = { ...defaultIndicatorStyle };
    }
  }, { immediate: true });
});

const emit = defineEmits<{
  (e: 'update:activeTab', name: string): void
}>();

const handleTabClick = (tab: TabProps) => {
  emit('update:activeTab', tab.name);
};

const isTabActive = (tab: TabProps) => {
  return props.activeTab === tab.name;
};

</script>

<style lang="scss" scoped>
.tabs {
  width: 100%;

  &__navigation {
    position: relative;
    overflow-x: auto;
    width: 80vw;
    padding-bottom: 1px;
    white-space: nowrap;
    border-bottom: 1px solid #EBEBF3;

    > * {
      margin-right: 24px;
    }

    @include screen-sm() {
      width: 100%;
    }

    .active-tab-indicator {
      position: absolute;
      bottom: 1px;
      left: 0;
      width: 0;
      height: 4px;
      transition-duration: .3s;
      transition-property: width, left;
      background-color: var(--color-primary);
    }
  }
}
</style>