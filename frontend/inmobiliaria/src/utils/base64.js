export function deBase64AFile(base64){
    var image = new Image();
    image.src = base64;
    return image;

}