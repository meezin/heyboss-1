import { useState, useEffect, useRef, cloneElement, Children } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

export default function ImageSlide({ slideId, images }) {<></>


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
  //   },
  //   {
  //     id:"2",
  //     img_url:"",
  //     subtab: [
  //       {img_url: "/img/team/lb-maguy.jpg"},
  //       {img_url: "/img/team/lb-maguy.jpg"}     
  //     ]
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

  return (<></>
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
      // <Swiper
      //   className="mySwiper swiper-h"
      //   direction={'vertical'}
      //   pagination={{
      //     clickable: true,
      //   }}
      //   mousewheel={true}
      //   slidesPerView={1}
      //   modules={[Mousewheel,Pagination]}
      // >
      //   {images.map((slide,index) =>  (
      //   <SwiperSlide key={index}>  
      //        <div
      //          className="image bg-cover bg-no-repeat bg-center w-full h-screen ease-out duration-300 hover:scale-105 hover:ease-in"
      //          style={{ backgroundImage: `url('${slide.img_url}')` }}
      //        ></div></SwiperSlide>
      //   ))}
      // </Swiper>
    //   <Swiper
    //   className="mySwiper swiper-h"
    //   spaceBetween={50}
    //   direction={'vertical'}
    //   pagination={{
    //     clickable: true,
    //   }}
    //   mousewheel={true}
    //   slidesPerView={1}
    //   modules={[Mousewheel,Pagination]}
    // >
    //   <SwiperSlide>Horizontal Slide 1</SwiperSlide>
    //   <SwiperSlide>Horizontal Slide 2</SwiperSlide>
    //   <SwiperSlide>
    //     <Swiper
    //       className="mySwiper2 swiper-v"
    //       pagination={{
    //         clickable: true,
    //       }}
    //       mousewheel={true}
    //       slidesPerView={1}
    //       modules={[Mousewheel,Pagination]}
    //     >
    //       <SwiperSlide>Vertical Slide 1</SwiperSlide>
    //       <SwiperSlide>Vertical Slide 2</SwiperSlide>
    //       <SwiperSlide>Vertical Slide 3</SwiperSlide>
    //       <SwiperSlide>Vertical Slide 4</SwiperSlide>
    //       <SwiperSlide>Vertical Slide 5</SwiperSlide>
    //     </Swiper>
    //   </SwiperSlide>
    //   <SwiperSlide>Horizontal Slide 3</SwiperSlide>
    //   <SwiperSlide>Horizontal Slide 4</SwiperSlide>
    // </Swiper>
  );
}