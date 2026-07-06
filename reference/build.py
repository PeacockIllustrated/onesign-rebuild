# Compiles reference templates into self-contained previews.
# Templates use @FONT_REG@ / @FONT_BOLD@ placeholders; this injects
# Gilroy as base64 so each file opens standalone in a browser.
# The production build should NOT embed fonts: use @font-face files
# served from /fonts with font-display: swap.
import base64, pathlib
root = pathlib.Path(__file__).parent
reg  = base64.b64encode((root.parent/'fonts/Gilroy-Regular.ttf').read_bytes()).decode()
bold = base64.b64encode((root.parent/'fonts/Gilroy-Bold.ttf').read_bytes()).decode()
for f in root.glob('*.html'):
    t = f.read_text().replace('@FONT_REG@', reg).replace('@FONT_BOLD@', bold)
    out = root/'compiled'/f.name
    out.parent.mkdir(exist_ok=True)
    out.write_text(t)
    print('compiled', f.name)
