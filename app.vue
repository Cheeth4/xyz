<template>
  <div class="app-view">
    <main class="app-view__content">
      <NuxtPage />
      <div class="shadow" />
    </main>
  </div>
</template>

<style lang="scss">
@import 'assets/scss/reset';

* {
  box-sizing: border-box;
}

html, body, #__nuxt, .app-view {
  font-family: var(--font-primary);
  width: 100vw;
  height: 100%;
  margin: 0;
  padding: 0;
  background-color: black;
}

:root {
  --font-primary: 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', sans-serif;

  --app-background-color: #FFFFFF;

  --color-primary: #7445FB;
  --color-secondary: #acacb2;

  --text-color-primary: #0A041C;
  --text-color-secondary: #9896A1;
  --text-color-success: #2DC78F;
  --text-color-danger: #EA4D4D;

  --input-bg-color: #F7F7F9;
  --input-bg-color-hover: #ECECEF;
}

.app-view {
  position: relative;
  display: flex;
  justify-content: center;

  &, &__content {
    overflow-y: scroll;
    width: 100%;
    max-width: calc(1440px - 264px);
    height: 100%;
    margin: 0 auto;
    background-color: var(--app-background-color);
  }

  .shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 136px;
    pointer-events: none;
    background-image: linear-gradient(180deg, rgba(247, 247, 249, 0) 0%, #F7F7F9 100%);
  }
}
</style>
