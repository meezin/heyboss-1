import { useState, useEffect, useRef, cloneElement } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function ImageSlide({ slideId }) {

  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('next'); // 'next' 또는 'prev'

  const sliderOptions = {
    direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      direction:"vertical",
      slidesPerview : 1,
      mousewheelControl: true,
  };



  useEffect(() => {
    new Swiper('.swiper-container', {
      direction: 'vertical',
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      direction:"vertical",
      slidesPerview : 1,
      mousewheelControl: true,
    });
  }, []);

  // // 현재 슬라이드 ID와 일치하는 이미지(들)을 찾음
  // const matchingImages = images.find(image => image.id === slideId);

  // // 이미지가 배열인 경우와 단일 URL인 경우를 처리
  // //const imageUrls = Array.isArray(matchingImages.img_url) ? matchingImages.img_url : [{ img_url: matchingImages.img_url }];

  // console.log("slide ID .,... ",slideId)
  // return (
  //   <div>
  //   <TransitionGroup>
  //     <CSSTransition
  //       key={slideId}
  //       classNames={`slide-${direction}`}
  //     >
  //     {/* {imageUrls.map((image, _) => (
  //       <img key={slideId} src={image.img_url} alt={`Slide ${slideId}`} />
  //     ))} */}
  //     <div
  //       className="image bg-cover bg-no-repeat bg-center w-full h-screen ease-out duration-300 hover:scale-105 hover:ease-in"
  //       style={{ backgroundImage: `url('${images.img_url}')` }}
  //     ></div>
  //     </CSSTransition>
  //   </TransitionGroup>
  //   </div>
  // );

  // useEffect = () => {
  //   console.log("Slide Component에서 할당받은 Slide ID",slideId)
  // }

  // const images = [
  //   {
  //     id: "0",
  //     img_url : "/img/team/lb-maguy.jpg"
  //   },
  //   {
  //     id: "1",
  //     img_url : "/img/team/lb-eric-001.jpg"
  //   }
  // ]

  // const slideUp = () => {
  //   const nextIndex = index - 1;
  //   if (nextIndex < 0) {
  //     setIndex(images.length - 1);
  //   } else {
  //     setIndex(nextIndex);
  //   }
  //   setDirection("prev");
  // };

  // const slideDown = () => {
  //   setIndex((index + 1) % images.length);
  //   setDirection("next");
  // };

  // const childFactory = (direction) => (child) =>
  //   cloneElement(child, {
  //     classNames: direction,
  //   });

  return (
    // images.length > 0 && (
    //   <div className="image-slider">
    //     <button onClick={slideUp}>{"<"}</button>
    //     <div className="image-wrapper">
    //       <TransitionGroup childFactory={childFactory(direction)}>
    //         <CSSTransition
    //           key={images[index].img_url}
    //           timeout={1000}
    //           classNames={`slide-${direction}`}
    //         >
    //           <img alt="" src={images[index].img_url} />
    //         </CSSTransition>
    //       </TransitionGroup>
    //     </div>
    //     <button onClick={slideDown}>{">"}</button>
    //   </div>
    // )
    <Swiper
    {...sliderOptions}
    >
      <div class="swiper-wrapper">
        <div class="swiper-slide"><img src="/img/team/lb-maguy.jpg" alt=""/></div>
        <div class="swiper-slide"><img src="/img/team/lb-eric-001.jpg" alt=""/></div>
      </div>
    </Swiper>
  );
  <script></script>
}