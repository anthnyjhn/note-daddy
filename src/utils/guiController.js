const textarea = document.getElementById("rootTextArea");
const textColorPicker = document.getElementById("textColorPicker");
const bgColorPicker = document.getElementById("bgColorPicker");
const bgTransparency = document.getElementById("bgTransparency");

function updateStyles() {
    const textColor = textColorPicker.value;
    const bgColor = bgColorPicker.value;
    const transparency = parseInt(bgTransparency.value) / 100;

    document.documentElement.style.setProperty("--text-color", textColor);

    const rgb = hexToRgb(bgColor);
    const rgba = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${transparency})`;
    document.documentElement.style.setProperty("--background-color", rgba);
}

function hexToRgb(hex) {
    const value = hex.replace("#", "");
    return {
        r: parseInt(value.substring(0, 2), 16),
        g: parseInt(value.substring(2, 4), 16),
        b: parseInt(value.substring(4, 6), 16),
    };
}

textColorPicker.addEventListener("input", updateStyles);
bgColorPicker.addEventListener("input", updateStyles);
bgTransparency.addEventListener("input", updateStyles);

updateStyles();