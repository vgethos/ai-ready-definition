-- image-resize.lua
-- Caps all images to 2.625in wide (75% of 3.5in standard text-area width).
-- Without this, screenshots and mockups expand to full page width and create blank pages.
-- Usage: pandoc input.md -o output.docx --lua-filter tools/pandoc/image-resize.lua

function Image(img)
    img.attributes['width'] = '2.625in'
    return img
end
