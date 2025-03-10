import React, { useState } from 'react';
import ReactCrop from 'react-image-crop';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

const ImageCropperModal = ({ 
  isOpen, 
  onClose, 
  images, 
  onComplete 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({
    unit: '%',
    width: 90,
    aspect: 16 / 9
  });
  const [croppedImages, setCroppedImages] = useState([]);
  const [imageRef, setImageRef] = useState(null);

  const getCroppedImg = () => {
    if (!imageRef) return;

    const canvas = document.createElement('canvas');
    const scaleX = imageRef.naturalWidth / imageRef.width;
    const scaleY = imageRef.naturalHeight / imageRef.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      imageRef,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = images[currentImageIndex].name;
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  const handleCropComplete = async () => {
    const croppedImage = await getCroppedImg();
    const newCroppedImages = [...croppedImages];
    newCroppedImages[currentImageIndex] = croppedImage;
    setCroppedImages(newCroppedImages);

    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    } else {
      onComplete(newCroppedImages);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>Crop Image {currentImageIndex + 1} of {images.length}</span>
            <Button 
              variant="ghost" 
              className="h-8 w-8 p-0" 
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {images[currentImageIndex] && (
            <ReactCrop
              crop={crop}
              onChange={c => setCrop(c)}
              aspect={16 / 9}
            >
              <img
                ref={ref => setImageRef(ref)}
                src={URL.createObjectURL(images[currentImageIndex])}
                className="max-h-[60vh] w-auto mx-auto"
                alt={`Image ${currentImageIndex + 1}`}
              />
            </ReactCrop>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-4">
          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleCropComplete}
          >
            {currentImageIndex < images.length - 1 ? 'Next Image' : 'Complete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropperModal;