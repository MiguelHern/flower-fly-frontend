<template>
  <div class="w-full grid grid-cols-3 items-center">
    <div class="w-full px-12 py-16 sm:px-0 col-span-2">
      <TabGroup>
        <TabList class="flex space-x-1 rounded-xl p-1">
          <Tab
            as="template"
          >
            <ButtonTab :selected="false">
              Flores
            </ButtonTab>
          </Tab>
          <Tab
            as="template"
          >
            <ButtonTab :selected="false">
              Envoltorio
            </ButtonTab>
          </Tab>
          <Tab
            as="template"
          >
            <ButtonTab :selected="false">
              Estilo
            </ButtonTab>
          </Tab>
        </TabList>

        <TabPanels class="mt-2">
          <TabPanel>
            <FlowersBouquet/>
          </TabPanel>
          <TabPanel>
            <WrappersBouquet/>
          </TabPanel>
          <TabPanel>
            <StylesBouquet/>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
    <div class="col-span-1">
      <SummaryBouquet/>
    </div>
  </div>
</template>

<script setup>
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import ButtonTab from '@/components/ui/ButtonTab.vue'
import StylesBouquet from '@/features/bouquets/components/StylesBouquet.vue'
import WrappersBouquet from '@/features/bouquets/components/WrappersBouquet.vue'
import FlowersBouquet from '@/features/bouquets/components/FlowersBouquet.vue'
import SummaryBouquet from '@/features/bouquets/components/SummaryBouquet.vue'


</script>
