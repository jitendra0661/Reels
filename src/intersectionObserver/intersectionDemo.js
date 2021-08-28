import React, { useEffect } from 'react';
import v1 from '../components/videos/v1.mp4';
import v2 from '../components/videos/v2.mp4';
import v3 from '../components/videos/v3.mp4';
import v4 from '../components/videos/v4.mp4';
import v5 from '../components/videos/v5.mp4';

const IntersectionDemo = () => {
  function callback(entries) {
    entries.forEach((entry) => {
      console.log('called');
      let child = entry.target.firstElementChild;
      child.play().then(() => {
        if (entry.isIntersecting === false) {
          child.pause();
        }
      });
      //   console.log(child.id);
    });
  }

  useEffect(() => {
    let conditionObj = {
      root: null,
      threshold: 0.9,
    };

    let observer = new IntersectionObserver(callback, conditionObj);
    let allVideoElements = document.querySelectorAll('.video-element');
    allVideoElements.forEach((video) => {
      observer.observe(video);
    });
  }, []);

  return (
    <div>
      <div className='video-element'>
        <Video src={v1} id='a' />
      </div>
      <div className='video-element'>
        <Video src={v2} id='b' />
      </div>
      <div className='video-element'>
        <Video src={v3} id='c' />
      </div>
      <div className='video-element'>
        <Video src={v4} id='d' />
      </div>
      <div className='video-element'>
        <Video src={v5} id='e' />
      </div>
      {/* <Video className='video-element' src={v1} id='1' />
      <Video className='video-element' src={v2} id='2' />
      <Video className='video-element' src={v3} id='3' />
      <Video className='video-element' src={v4} id='4' /> */}
    </div>
  );
};

function Video(props) {
  return <video width='800px' muted={true} controls src={props.src}></video>;
}

export default IntersectionDemo;
