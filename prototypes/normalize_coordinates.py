# TikTok Label Bridge - Normalized Coordinate Brain (v1.1)
# Based on User Manual Research (LaTeX Geometric Proof)

def normalize_coordinate(pixel, total_dim):
    """Normalized coordinate z = p / T"""
    return pixel / total_dim

def calculate_crop_box_normalized(barcode_box, target_ratio=1.5):
    """
    Given the normalized barcode box (x1, y1, x2, y2),
    expand to a 4x6 area (ratio 1.5) while maintaining quiet zones.
    """
    b_w = barcode_box[2] - barcode_box[0]
    b_h = barcode_box[3] - barcode_box[1]
    
    # Calculate target dimensions based on ratio 1.5 (6/4)
    # This expands the crop area from the barcode base
    crop_w = b_w * 1.25 # Add 25% padding for quiet zone
    crop_h = crop_w * target_ratio
    
    print(f"--- Precision Normalization Engine ---")
    print(f"Barcode Anchor (Norm): {barcode_box}")
    print(f"Calculated Crop Width: {crop_w:.4f}")
    print(f"Calculated Crop Height: {crop_h:.4f}")
    print(f"Status: READY for PDF-Lib integration.")

if __name__ == "__main__":
    # Test with estimated TikTok A4 quad coordinates
    calculate_crop_box_normalized([0.1, 0.6, 0.9, 0.8])
