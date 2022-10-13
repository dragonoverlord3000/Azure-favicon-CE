import os
from PIL import Image
from io import BytesIO
import cairosvg

root = "./icons (1)/"

# Write name_dict to s_list.txt
l = [f"\"{file[:-4].lower().replace(' ', '')}\": \"{file[:-4]}.ico\"," for file in os.listdir("./icons (1)")]
with open("./s_list.txt", "w") as f: 
    f.write("\n".join(l))


# Convert SVG's to ICO's
print(f"Length before: {len(os.listdir(root))}")

failed = []
for im_name in os.listdir(root):
    try: 
        out = BytesIO()
        cairosvg.svg2png(url=f"{root}{im_name}", write_to=out)
        image = Image.open(out)
        icon_sizes = [(16,16), (32, 32), (48, 48), (64,64)]
        image.save(f"{root}{im_name[:-4]}.ico", sizes=icon_sizes)
    except:
        failed.append(im_name)
        print(im_name)

print(f"Length after: {len(os.listdir(root))}")
print(f"# failed = {len(failed)}")
