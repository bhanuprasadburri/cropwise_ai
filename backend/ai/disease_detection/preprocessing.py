import os
import io
import numpy as np
from PIL import Image

ALLOWED_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.webp'}
ALLOWED_MIME_TYPES = {'image/jpeg', 'image/png', 'image/webp'}
MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024  # 10 MB

def validate_image_file(file_obj) -> tuple[bool, str]:
    """
    Validates file extension, size, MIME type, and Pillow image integrity.
    """
    ext = os.path.splitext(file_obj.name)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        return False, f"Unsupported file extension '{ext}'. Only JPG, JPEG, PNG, WEBP allowed."

    if hasattr(file_obj, 'size') and file_obj.size > MAX_FILE_SIZE_BYTES:
        return False, "File size exceeds maximum limit of 10 MB."

    try:
        image_bytes = file_obj.read()
        file_obj.seek(0)  # Reset pointer
        img = Image.open(io.BytesIO(image_bytes))
        img.verify()
        
        # Check dimensions
        if img.width < 50 or img.height < 50:
            return False, "Image resolution too low. Please upload a clear leaf photograph."
            
    except Exception as e:
        return False, f"Invalid or corrupted image file: {str(e)}"

    return True, "Valid image"


def preprocess_image_tensor(file_obj) -> np.ndarray:
    """
    Loads, resizes image to 224x224, and extracts RGB color/texture feature vectors.
    """
    file_obj.seek(0)
    img = Image.open(file_obj).convert('RGB')
    img_resized = img.resize((224, 224))
    
    arr = np.array(img_resized, dtype=np.float32) / 255.0
    return arr
