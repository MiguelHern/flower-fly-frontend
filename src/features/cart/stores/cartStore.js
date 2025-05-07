// src/stores/cartStore.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useCartStore = defineStore('items', () => {
  const selectedItems = ref([]);

  const totalItems = computed(() => {
    return selectedItems.value.reduce((total, item) => total + item.quantity, 0);
  });

  const totalPrice = computed(() => {
    return selectedItems.value.reduce((total, item) =>
      total + (item.price * item.quantity), 0);
  });

  function getItemQuantity(id) {
    const item = selectedItems.value.find(item => item.id === id);
    return item ? item.quantity : 0;
  }

  function addSelectedItem(item) {
    const existingIndex = selectedItems.value.findIndex(existingItem => existingItem.id === item.id);

    if (existingIndex >= 0) {
      selectedItems.value[existingIndex].quantity += item.quantity || 1;
    } else {
      selectedItems.value.push({ ...item, quantity: item.quantity || 1 });
    }

    saveToLocalStorage();
  }


  function removeSelectedItem(itemId) {
    selectedItems.value = selectedItems.value.filter(item => item.id !== itemId);
    saveToLocalStorage();
  }

  function updateItemQuantity(itemId, quantity) {
    const itemIndex = selectedItems.value.findIndex(item => item.id === itemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        selectedItems.value = selectedItems.value.filter(item => item.id !== itemId);
      } else {
        selectedItems.value[itemIndex].quantity = quantity;
      }
      saveToLocalStorage();
    }
  }

  function clearSelectedItems() {
    selectedItems.value = [];
    saveToLocalStorage();
  }

  function saveToLocalStorage() {
    localStorage.setItem('selectedItems', JSON.stringify(selectedItems.value));
  }

  function loadFromLocalStorage() {
    const saved = localStorage.getItem('selectedItems');
    if (saved) {
      try {
        selectedItems.value = JSON.parse(saved);
      } catch (e) {
        console.error('Error loading saved flowers:', e);
        selectedItems.value = [];
      }
    }
  }

  loadFromLocalStorage();

  return {
    selectedItems,
    totalItems,
    totalPrice,
    addSelectedItem,
    removeSelectedItem,
    updateItemQuantity,
    clearSelectedItems,
    getItemQuantity
  };
});
