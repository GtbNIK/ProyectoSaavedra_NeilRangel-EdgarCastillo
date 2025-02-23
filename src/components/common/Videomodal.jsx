// src/components/common/VideoModal.jsx
import React, { useEffect, useState } from 'react';

const VideoModal = () => {
    const [videoSrc, setVideoSrc] = useState('');

    useEffect(() => {
        const handleShowModal = (e) => {
            const target = e.relatedTarget; // El botón que activó el modal
            const src = target.getAttribute('data-src');
            setVideoSrc(src + "?autoplay=1&modestbranding=1&showinfo=0");
        };

        const handleHideModal = () => {
            setVideoSrc('');
        };

        const videoModal = document.getElementById('videoModal');
        videoModal.addEventListener('show.bs.modal', handleShowModal);
        videoModal.addEventListener('hide.bs.modal', handleHideModal);

        return () => {
            videoModal.removeEventListener('show.bs.modal', handleShowModal);
            videoModal.removeEventListener('hide.bs.modal', handleHideModal);
        };
    }, []);

    return (
      <div className="modal fade" id="videoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={videoSrc} id="video" allowscriptaccess="always" allow="autoplay"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default VideoModal;