export const downloadText = (text: string) => {
    const hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:attachment/text,' + encodeURIComponent(text);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'redeboon-' + new Date().getTime() + '.config';
    hiddenElement.click();
}

export const importData = (callback: (text: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.config';
    input.onchange = _ => {
        if (input.files) {
            for (let file of input.files) {
                file.text().then((text) => {
                    callback(text);
                });
            }
        }
    };
    input.click();

}
