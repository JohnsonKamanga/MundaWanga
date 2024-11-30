import React, { useState, useEffect, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');
const imageHeight = 200; 

const images = [
  { slide: require('../assets/images/slide1.jpg') },
  { slide: require('../assets/images/slide2.jpg') },
  { slide: require('../assets/images/slide3.jpg') },
  { slide: require('../assets/images/slide4.jpg') },
];

const Slideshow = () => {
  const [position, setPosition] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextPosition = (position + 1) % images.length;
      scrollToPosition(nextPosition);
      setPosition(nextPosition);
    }, 3000);

    return () => clearInterval(interval);
  }, [position]);

  const scrollToPosition = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: width * index, animated: true });
    }
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { x: any; }; }; }) => {
    const scrollX = event.nativeEvent.contentOffset.x;
    const newPosition = Math.round(scrollX / width);
    setPosition(newPosition);
  };

  const goToNextSlide = () => {
    const nextPosition = (position + 1) % images.length;
    scrollToPosition(nextPosition);
    setPosition(nextPosition);
  };

  const goToPreviousSlide = () => {
    const prevPosition = (position - 1 + images.length) % images.length;
    scrollToPosition(prevPosition);
    setPosition(prevPosition);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollView}
      >
        {images.map((item, index) => (
          <Image key={index} source={item.slide} style={styles.image} />
        ))}
      </ScrollView>

      {/* Indicator Dots */}
      <View style={styles.indicatorContainer}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              position === index && styles.indicatorActive
            ]}
          />
        ))}
      </View>

      {/* Navigation Arrows */}
      <TouchableOpacity style={styles.leftArrow} onPress={goToPreviousSlide}>
        <View style={styles.arrow} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.rightArrow} onPress={goToNextSlide}>
        <View style={[styles.arrow, styles.arrowRight]} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width,
  },
  image: {
    width,
    height: imageHeight,
    resizeMode: 'cover',
  },
  indicatorContainer: {
    position: 'absolute',
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  indicatorActive: {
    backgroundColor: '#fff',
  },
  leftArrow: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  rightArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -10 }],
  },
  arrow: {
    width: 0,
    height: 0,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderLeftWidth: 12,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: '#fff',
  },
  arrowRight: {
    transform: [{ rotate: '180deg' }],
  },
});

export default Slideshow;
