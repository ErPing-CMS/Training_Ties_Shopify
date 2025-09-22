/**
 * Alternative JavaScript solution to ensure ad image displays first
 * This script reorders product images to show the first product image first,
 * regardless of variant selection.
 */

class ProductImageReorder {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.reorderImages());
    } else {
      this.reorderImages();
    }
  }

  reorderImages() {
    const mediaGallery = document.querySelector('media-gallery');
    if (!mediaGallery) return;

    const mainSlider = mediaGallery.querySelector('.product__media-list');
    const thumbnailSlider = mediaGallery.querySelector('.thumbnail-list');
    
    if (!mainSlider) return;

    // Get all media items
    const mediaItems = Array.from(mainSlider.querySelectorAll('.product__media-item'));
    const thumbnailItems = thumbnailSlider ? Array.from(thumbnailSlider.querySelectorAll('.thumbnail-list__item')) : [];

    if (mediaItems.length === 0) return;

    // Find the first image in the product (should be the ad image)
    // This assumes the first image in the HTML is always the ad image
    const firstMediaItem = mediaItems[0];
    const firstThumbnailItem = thumbnailItems[0];

    // Remove active class from all items
    mediaItems.forEach(item => item.classList.remove('is-active'));
    thumbnailItems.forEach(item => {
      const button = item.querySelector('.thumbnail');
      if (button) button.removeAttribute('aria-current');
    });

    // Move first image to the beginning and make it active
    if (firstMediaItem) {
      mainSlider.prepend(firstMediaItem);
      firstMediaItem.classList.add('is-active');
    }

    if (firstThumbnailItem && thumbnailSlider) {
      thumbnailSlider.prepend(firstThumbnailItem);
      const firstThumbnailButton = firstThumbnailItem.querySelector('.thumbnail');
      if (firstThumbnailButton) {
        firstThumbnailButton.setAttribute('aria-current', 'true');
      }
    }

    // Update gallery viewer if it exists
    const galleryViewer = mediaGallery.querySelector('slider-component');
    if (galleryViewer && galleryViewer.resetPages) {
      galleryViewer.resetPages();
    }
  }
}

// Initialize the image reorder functionality
new ProductImageReorder();