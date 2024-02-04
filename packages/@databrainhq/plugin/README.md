# @databrainhq/plugin

> Databrain app ui web component plugin.

[![NPM](https://img.shields.io/npm/v/@databrainhq/plugin.svg)](https://www.npmjs.com/package/@databrainhq/plugin) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install @databrainhq/plugin
```

## Usage

React/Solidjs

Import in main/index/App
```tsx
import '@databrainhq/plugin/web';
```
Then use it anywhere in your app

Integrating Dashboard

```tsx
const Example = () => {
  return (
    <dbn-dashboard
      token="Your Guest Token"
      dashboardId="Your Dashboard Id"
      options={{
        disableMetricCreation: false,
        disableMetricUpdation: false,
        disableMetricDeletion: false,
        disableLayoutCustomization: false,
        chartColors: [
          'violet',
          'indigo',
          'blue',
          'green',
          'yellow',
          'orange',
          'red',
          'pink',
          'gray',
        ],
      }}
      theme={YOUR_THEME}
    />
  );
};
```

Integrating Metric

```tsx
const Example = () => {
  return (
    <Metric
      token="Your Guest Token"
      metricId="Your Metric Id"
      width="500px"
      height="300px"
      chartRendererType="canvas"
      chartColors={[
        'violet',
        'indigo',
        'blue',
        'green',
        'yellow',
        'orange',
        'red',
        'pink',
        'gray',
      ]}
      theme={YOUR_THEME}
    />
  );
};
```

Vue

Import in main/index/App
```vue
<script setup lang="ts">
import '@databrainhq/plugin/web';
</script>
```
Then use it anywhere in your app

Integrating Dashboard

```vue
<script setup lang="ts">
  // your component logic
</script>
<template>
  <dbn-dashboard
    :token="/*YOUR GUEST TOKEN*/"
    :options="/*YOUR ACCESS PERMISSION OPTIONS*/"
    :theme="/*YOUR THEME*/"
    :dashboardId="/*YOUR DASHBORD ID*/"
  ></dbn-dashboard>
</template>
```

Integrating Metric

```vue
<script setup lang="ts">
  // your component logic
</script>
<template>
  <dbn-metric
    :token="/*YOUR GUEST TOKEN*/"
    chartRendererType="canvas"
    :theme="/*YOUR THEME*/"
    :dashboardId="/*YOUR DASHBORD ID*/"
    width="500"
    height="400"
    :style="/* YOUR STYLEs */"
    className="YOUR CLASS"
  ></dbn-metric>
</template>
```

Svelte

Import in main/index/App

```svelte
<script lang="ts">
import '@databrainhq/plugin/web';
</script>
```

Then use it anywhere in your app

Integrating Dashboard

```svelte
<script lang="ts">
  // your component logic
</script>
<main>
  <dbn-dashboard
    token={/*YOUR GUEST TOKEN*/}
    options={/*YOUR ACCESS PERMISSION OPTIONS*/}
    theme={/*YOUR THEME*/}
    dashboardId={/*YOUR DASHBORD ID*/}
  ></dbn-dashboard>
</main>
```

Integrating Metric

```svelte
<script lang="ts">
// your component logic
</script>
<main>
  <dbn-metric
    token={/*YOUR GUEST TOKEN*/}
    chartRendererType="canvas"
    theme={/*YOUR THEME*/}
    dashboardId="/*YOUR DASHBORD ID*/"
    width="500"
    height="400"
    style={/* YOUR STYLEs */}
    className="YOUR CLASS"
  ></dbn-metric>
</main>
```

Angular

Add suport for custom elements/web components in app.module.ts

```ts
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class AppModule {}
```
Import in app.component.ts

```ts
import '@databrainhq/plugin/web';
```

Then use it anywhere in your app

Integrating Dashboard

```html
<dbn-dashboard
  token="YOUR GUEST TOKEN"
  options="YOUR ACCESS PERMISSION OPTIONS"
  theme="YOUR THEME"
  dashboardId="YOUR DASHBORD ID"
></dbn-dashboard>
```

Integrating Metric

```html
<dbn-metric
  token="YOUR GUEST TOKEN"
  chartRendererType="canvas"
  theme="YOUR THEME"
  dashboardId="YOUR DASHBORD ID"
  width="500"
  height="400"
  style="YOUR STYLE"
  className="YOUR CLASS"
></dbn-metric>
```

## License

MIT © [databrainhq](https://github.com/databrainhq)
