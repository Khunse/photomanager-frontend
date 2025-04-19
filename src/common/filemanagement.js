

export const downloadImageS3 = async ({imgName,imgUrl}) => {
    try {
        const response = await fetch(imgUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'image/png',
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = imgName;
        document.body.appendChild(a); // Append to body to make it work in Firefox
        a.click(); // Trigger the download
        a.remove(); // Clean up and remove the link element
        window.URL.revokeObjectURL(url); // Release the object URL

    } catch (error) {
        console.error('Error downloading image:', error);
        return null;
    }
};