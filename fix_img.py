with open("src/components/StatusWindow.tsx", "r", encoding="utf-8") as f:
    c = f.read()

# Fix image
c = c.replace("jeevan-character.png", "jeevanbg.png")

# Remove float animation - replace the animate/transition on the img
c = c.replace(
    'animate={pulse ? { scale: [1, 1.03, 1] } : { y: [0, -10, 0] }}\n          transition={pulse ? { duration: 0.4 } : { duration: 4, ease: "easeInOut", repeat: Infinity }}',
    ''
)

with open("src/components/StatusWindow.tsx", "w", encoding="utf-8") as f:
    f.write(c)

# Check
with open("src/components/StatusWindow.tsx", "r", encoding="utf-8") as f:
    content = f.read()
    
print("jeevanbg in file:", "jeevanbg.png" in content)
print("float animation removed:", "y: [0, -10, 0]" not in content)
print("file size:", len(content))
