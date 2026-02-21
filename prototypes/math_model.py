# TikTok Label Bridge - Math Model (Python)

def calculate_crop_and_scale():
    # A4 Dimensions in points
    a4_w, a4_h = 595, 842
    
    # Target 4x6 Dimensions in points
    target_w, target_h = 288, 432
    
    # Estimate TikTok Label position on A4 (based on research)
    # The label is usually a 4x6 area embedded in the A4 page.
    label_w, label_h = 432, 288 # Landscape orientation often used in A4 containers
    
    # Calculate scale factor to fit the 4x6 target
    scale_x = target_w / label_w
    scale_y = target_h / label_h
    scale = min(scale_x, scale_y)
    
    print(f"--- TikTok Label Transformation Model ---")
    print(f"Source: A4 ({a4_w}x{a4_h} pts)")
    print(f"Target: 4x6 ({target_w}x{target_h} pts)")
    print(f"Detected Label Region: {label_w}x{label_h} pts")
    print(f"Required Scaling: {scale:.2f}x")
    print(f"-----------------------------------------")
    print(f"TRANSFORMATION STEPS:")
    print(f"1. Crop to [40, 450, 515, 350] coordinates.")
    print(f"2. Rotate 90 degrees (if landscape).")
    print(f"3. Apply {scale:.2f}x scale transform.")
    print(f"4. Center on 4x6 canvas.")

if __name__ == "__main__":
    calculate_crop_and_scale()
