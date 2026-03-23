import os

def replace_in_file(filepath, search_text, replace_text):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    if search_text in content:
        new_content = content.replace(search_text, replace_text)
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        return True
    return False

src_dir = 'src'
count = 0

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            filepath = os.path.join(root, file)
            if replace_in_file(filepath, '#0F172A', 'zinc-950'):
                print(f"Updated: {filepath}")
                count += 1

print(f"Finished. Updated {count} files.")
