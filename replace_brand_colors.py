 import os

def replace_colors(filepath):
    with open(filepath, 'r', encoding='utf-8') as file:
        content = file.read()
    
    replacements = {
        '#f97316': '#76BC43',
        '#ea6c0a': '#65a30d', # Darker green for hover
        'orange-500': 'lime-600',
        'orange-600': 'lime-700',
        'orange-50': 'lime-50',
        'orange-100': 'lime-100',
        'orange-200': 'lime-200',
        'orange-400': 'lime-500',
        'text-orange-500': 'text-lime-600',
        'text-orange-600': 'text-lime-700',
        'bg-orange-500': 'bg-lime-600',
        'bg-orange-600': 'bg-lime-700',
        'border-orange-200': 'border-lime-200',
        'hover:text-orange-500': 'hover:text-lime-600',
        'hover:text-orange-600': 'hover:text-lime-700',
        'hover:bg-orange-50': 'hover:bg-lime-50',
        'hover:bg-orange-100': 'hover:bg-lime-100',
        'hover:bg-orange-600': 'hover:bg-lime-700',
        'shadow-orange-500': 'shadow-lime-600',
        'shadow-orange-100': 'shadow-lime-100',
        'text-orange-600': 'text-lime-700',
        'bg-orange-50': 'bg-lime-50',
        'text-amber-500': 'text-lime-600', # For icons like Zap
        'bg-amber-500': 'bg-lime-600'
    }
    
    changed = False
    new_content = content
    for old, new in replacements.items():
        if old in new_content:
            new_content = new_content.replace(old, new)
            changed = True
            
    if changed:
        with open(filepath, 'w', encoding='utf-8') as file:
            file.write(new_content)
        return True
    return False

src_dir = 'src'
count = 0
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith(('.tsx', '.ts', '.css')):
            if replace_colors(os.path.join(root, file)):
                print(f"Updated: {os.path.join(root, file)}")
                count += 1

print(f"Finished. Updated {count} files.")
