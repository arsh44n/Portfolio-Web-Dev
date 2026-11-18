#!/usr/bin/env python3
import sys
import os
from rembg import remove, new_session
from PIL import Image

input_path = "public/assets/avatar_raw.jpg"
output_path = "public/assets/creator_avatar.png"
output_assets_path = "assets/creator_avatar.png"

print("Opening raw image...")
input_image = Image.open(input_path)

print("Initializing lightweight u2netp session (4.7MB)...")
session = new_session("u2netp")

print("Processing background removal...")
output_image = remove(input_image, session=session)

output_image.save(output_path, "PNG")
output_image.save(output_assets_path, "PNG")
print(f"SUCCESS: Transparent PNG saved to {output_path} and {output_assets_path}!")
