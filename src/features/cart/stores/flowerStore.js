// src/stores/flowerStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useFlowerStore = defineStore('flowers', () => {
  // Estado
  const selectedFlowers = ref([]);

  const totalItems = computed(() => {
    return selectedFlowers.value.reduce((total, flower) => total + flower.quantity, 0);
  });

  const totalPrice = computed(() => {
    return selectedFlowers.value.reduce((total, flower) =>
      total + (flower.price * flower.quantity), 0);
  });

  function addSelectedFlower(flower) {
    const existingIndex = selectedFlowers.value.findIndex(item => item.id === flower.id);

    if (existingIndex >= 0) {
      selectedFlowers.value[existingIndex].quantity += flower.quantity;
    } else {
      selectedFlowers.value.push({...flower});
    }

    saveToLocalStorage();
  }

  function removeSelectedFlower(flowerId) {
    selectedFlowers.value = selectedFlowers.value.filter(item => item.id !== flowerId);
    saveToLocalStorage();
  }

  function updateFlowerQuantity(flowerId, quantity) {
    const flowerIndex = selectedFlowers.value.findIndex(item => item.id === flowerId);

    if (flowerIndex >= 0) {
      if (quantity <= 0) {
        selectedFlowers.value = selectedFlowers.value.filter(item => item.id !== flowerId);
      } else {
        selectedFlowers.value[flowerIndex].quantity = quantity;
      }
      saveToLocalStorage();
    }
  }

  function clearSelectedFlowers() {
    selectedFlowers.value = [];
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem('selectedFlowers', JSON.stringify(selectedFlowers.value));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('selectedFlowers');
    if (saved) {
      try {
        selectedFlowers.value = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved flowers:', e);
        selectedFlowers.value = [];
      }
    }
  }

  loadFromLocalStorage();

  return {
    selectedFlowers,
    totalItems,
    totalPrice,
    addSelectedFlower,
    removeSelectedFlower,
    updateFlowerQuantity,
    clearSelectedFlowers
  };
});
