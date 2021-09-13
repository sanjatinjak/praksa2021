import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {View, Image, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Button} from 'react-native-elements';
import {HeaderText, BodyText} from '../components/CustomText';
import {Picker} from '@react-native-picker/picker';

import TouchableCmp from '../components/TouchableCmp';
import * as cartActions from '../redux-store/actions/cart';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const SLIDE_WIDTH = Math.round(viewportWidth / 2.6);
const ITEM_HORIZONTAL_MARGIN = 15;
const ITEM_WIDTH = Dimensions.get('window').width;
const SLIDER_WIDTH = viewportWidth;

export default ProductDetails = props => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [expandImage, setExpandImage] = useState(false);
  const dispatch = useDispatch();

  const imagesArray = props.product.images;
  let imageUri = [];
  for (let i in imagesArray) {
    imageUri.push(`data:image/png;base64,${imagesArray[i]}`);
  }

  const sizes = props.product.sizes;
  const checkSizes = () => {
    if (sizes) {
      if (sizes.length == 0) {
        return <BodyText style={{color: 'red'}}>No sizes</BodyText>;
      }
      return pickSize();
    }
  };

  const isDisabled = () => {
    if (sizes) {
      if (sizes.length == 0) return true;
      return false;
    }
  };

  const [selectedSize, setSize] = useState(sizes && sizes.length > 0 ? sizes[0].id : 0);

  const pickSize = () => (
    <Picker
      mode="dropdown"
      style={{width:150, marginHorizontal:20}}
      dropdownIconColor="black"
      itemStyle={{fontFamily: 'Poppins-Bold'}}
      selectedValue={selectedSize}
      onValueChange={itemVal => setSize(itemVal)}>
      {sizes.map((size, i) => {
        return (
          <Picker.Item
            label={size.name}
            value={size.id}
            key={i}
            fontFamily="Poppins-Bold"
          />
        );
      })}
    </Picker>
  );

  return (
    <View>
      {/* images */}
      <View
        style={{
          width: '100%',
          height: expandImage ? Dimensions.get('window').height : 300,
        }}>
        <Carousel
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          activeSlideAlignment={'start'}
          activeAnimationType={'spring'}
          data={imageUri}
          renderItem={items => {
            return (
              <View>
                <TouchableCmp onPress={() => setExpandImage(!expandImage)}>
                  <Image
                    source={{uri: items.item}}
                    style={{
                      width: '100%',
                      height: expandImage
                        ? Dimensions.get('window').height
                        : 300,
                    }}
                    resizeMode="center"
                  />
                </TouchableCmp>
              </View>
            );
          }}
          onSnapToItem={index => setActiveSlide(index)}
        />
      </View>

      {/* pagination for images carousel */}
      <Pagination
        dotsLength={imageUri.length}
        activeDotIndex={activeSlide}
        containerStyle={{backgroundColor: 'transparent'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'black',
        }}
        inactiveDotStyle={{
          backgroundColor: '#ccc',
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />

      {/* info about product */}
      <View style={styles.infoContainer}>
        <HeaderText> ${props.product.price} </HeaderText>
        <HeaderText> {props.product.name} </HeaderText>
        <BodyText> COD: {props.product.serialNumber} </BodyText>
      </View>

      {/* sizes picker and add to bag button */}
      <View style={styles.itemsContainer}>
        <View style={styles.textContainer}>{checkSizes()}</View>
        <View style={styles.buttonContainer}>
          <Button
            titleStyle={{fontFamily: 'Poppins-Bold'}}
            buttonStyle={{backgroundColor: 'green', borderRadius:50}}
            title="ADD TO CART"
            onPress={() => {
              dispatch(cartActions.addToCart(props.product, selectedSize));
            }}
            disabled={isDisabled()}
          />
        </View>
      </View>

      {/*  product details */}
      <View style={styles.detailsContainer}>
        <HeaderText>PRODUCT DETAILS</HeaderText>
        <BodyText numberOfLines={10}>{props.product.description}</BodyText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
  },
  infoContainer: {
    width: '100%',
    height: '10%',
    padding: 5,
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  itemsContainer: {
    width: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    elevation: 3,
  },
  textContainer: {
    width: '50%',
    borderRightWidth: 0.8,
    borderRightColor: 'gray'
  },
  buttonContainer: {
    width: '50%',
    padding: 5,
  },
  detailsContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: Dimensions.get('window').width,
    marginBottom: 50,
  },
});
