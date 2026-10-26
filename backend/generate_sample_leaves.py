"""
Generate high-fidelity sample leaf images with characteristic foliar disease patterns
for testing the KrishiLink Plant Disease Diagnostic Studio.
"""

import os
from PIL import Image, ImageDraw, ImageFilter
import numpy as np

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "sample_leaves")
os.makedirs(OUTPUT_DIR, exist_ok=True)

def create_base_leaf(color=(45, 138, 48), size=(400, 400)):
    """Draws an organic leaf shape with realistic gradient and venation."""
    img = Image.new("RGB", size, (244, 246, 240))
    draw = ImageDraw.Draw(img)
    
    # Organic leaf ellipse
    leaf_box = [60, 40, 340, 360]
    draw.ellipse(leaf_box, fill=color)
    
    # Central midrib vein
    draw.line([(200, 370), (200, 50)], fill=(70, 160, 60), width=4)
    # Lateral veins
    for y in range(90, 350, 30):
        offset = int(60 * (1 - abs(y - 200) / 180))
        draw.line([(200, y), (200 - offset, y - 25)], fill=(65, 155, 55), width=2)
        draw.line([(200, y), (200 + offset, y - 25)], fill=(65, 155, 55), width=2)
        
    return img

def make_healthy_leaf():
    img = create_base_leaf(color=(40, 145, 45))
    img = img.filter(ImageFilter.GaussianBlur(1.2))
    img.save(os.path.join(OUTPUT_DIR, "healthy_leaf.jpg"), "JPEG", quality=90)

def make_tomato_early_blight():
    img = create_base_leaf(color=(55, 130, 40))
    draw = ImageDraw.Draw(img)
    
    # Add concentric target board spots (brown with yellow halo)
    spots = [(160, 140, 35), (230, 220, 42), (180, 270, 28)]
    for cx, cy, rad in spots:
        # Yellow chlorotic halo
        draw.ellipse([cx - rad - 12, cy - rad - 12, cx + rad + 12, cy + rad + 12], fill=(185, 175, 40))
        # Concentric rings
        draw.ellipse([cx - rad, cy - rad, cx + rad, cy + rad], fill=(85, 50, 25))
        draw.ellipse([cx - rad + 8, cy - rad + 8, cx + rad - 8, cy + rad - 8], fill=(60, 35, 15))
        draw.ellipse([cx - rad + 16, cy - rad + 16, cx + rad - 16, cy + rad - 16], fill=(45, 25, 10))
        
    img = img.filter(ImageFilter.GaussianBlur(1.0))
    img.save(os.path.join(OUTPUT_DIR, "tomato_early_blight.jpg"), "JPEG", quality=90)

def make_tomato_late_blight():
    img = create_base_leaf(color=(50, 115, 45))
    draw = ImageDraw.Draw(img)
    
    # Large water-soaked dark decaying blotches
    draw.polygon([(100, 80), (190, 70), (170, 160), (90, 140)], fill=(45, 40, 30))
    draw.polygon([(180, 220), (310, 200), (320, 310), (220, 320)], fill=(38, 35, 25))
    # Grey-white mildew border
    draw.ellipse([140, 130, 210, 200], fill=(130, 125, 110))
    
    img = img.filter(ImageFilter.GaussianBlur(1.5))
    img.save(os.path.join(OUTPUT_DIR, "tomato_late_blight.jpg"), "JPEG", quality=90)

def make_rice_blast():
    img = create_base_leaf(color=(60, 140, 50))
    draw = ImageDraw.Draw(img)
    
    # Spindle / diamond shaped lesions with grey center and brown margin
    lesions = [(170, 120), (220, 190), (160, 250), (210, 300)]
    for lx, ly in lesions:
        draw.polygon([(lx - 12, ly), (lx, ly - 30), (lx + 12, ly), (lx, ly + 30)], fill=(110, 55, 25))
        draw.polygon([(lx - 6, ly), (lx, ly - 18), (lx + 6, ly), (lx, ly + 18)], fill=(180, 175, 165))
        
    img = img.filter(ImageFilter.GaussianBlur(1.0))
    img.save(os.path.join(OUTPUT_DIR, "rice_blast.jpg"), "JPEG", quality=90)

def make_corn_rust():
    img = create_base_leaf(color=(65, 140, 45))
    draw = ImageDraw.Draw(img)
    
    # Scattered cinnamon-brown / orange pustules
    np.random.seed(99)
    for _ in range(85):
        rx = int(np.random.uniform(110, 290))
        ry = int(np.random.uniform(90, 320))
        draw.ellipse([rx, ry, rx + 8, ry + 12], fill=(175, 75, 20))
        draw.ellipse([rx + 2, ry + 2, rx + 6, ry + 10], fill=(210, 110, 25))
        
    img = img.filter(ImageFilter.GaussianBlur(0.8))
    img.save(os.path.join(OUTPUT_DIR, "corn_rust.jpg"), "JPEG", quality=90)

if __name__ == "__main__":
    make_healthy_leaf()
    make_tomato_early_blight()
    make_tomato_late_blight()
    make_rice_blast()
    make_corn_rust()
    print("All sample leaf test images generated successfully in:", OUTPUT_DIR)
