import React , { useEffect, useState } from 'react';
import { Text, View} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { Image, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

export default function HomeScreen() {
  // const WIDTH = Dimensions.get('window').width;
  // const numColumns = 2.2;
  // const tileSize = WIDTH / numColumns;
  // const HEIGHT = Dimensions.get('window').height;
  const { user } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);    
  const [banners, setBann] = useState([]);    
  getCategories = () => {
      fetch('http://194.36.191.166/api/v1/tours/')
        .then((response) => response.json())
        .then((json) => setCategories(json.data))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
  }    
  getBanners = () => {
    fetch('http://194.36.191.166/api/v1/banners/')
      .then((response) => response.json())
      .then((json) => setBann(json.banners))
      
      .catch((error) => console.error(error))
      // console.log(json.images);
}    
  useEffect(() => {
      setLoading(true);
      getCategories();
      getBanners();
  }, []);  
  return (
    <View className="w-full h-full">
            <View style={styles.container}  >
          {isLoading ? 
          <Text>Загрузка...</Text> :
          (
  <View style={styles.MainContainer}> 
          <FlatList 
            data={banners}
            showsHorizontalScrollIndicator={true}
            pagingEnabled
            horizontal
            style={styles.wrap}
            keyExtractor={({ id }) => id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity 
              onPress={() => navigation.navigate('ToursScreen' , {paramKey: item.id} )}>
                <View style={styles.gallery}>
                <Image style={styles.img} resizeMode='cover' source={{uri: 'http://194.36.191.166/storage/'+ item.image.image_name}}/>
                </View>
                <View style={styles.Panelslider}>
                <Text style={styles.textPanelslider}>{`${item.title}`}</Text>
                <Text style={styles.pricePanelText}>{`${item.schedules[0].price/1}`} ₽</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        <View>
        <Text style={styles.zagText}>Рекомендации</Text>
        {/* <Text style={styles.linkText} onPress={loadScene}> Все туры </Text> */}
        </View>
        
          <FlatList 
                style={styles.colCont}
                data={categories}
                numColumns={2}
                key={2}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity  
                  style={styles.colItem}
                  onPress={() => navigation.navigate('ToursScreen' , {paramKey: item.id} )}>
                    <Image style={styles.colImg}  source={{uri: 'http://194.36.191.166/storage/'+ item.image.image_name}}/>
                    <View style={styles.textPanel}>
                    <Text style={styles.colText}>{`${item.title}`}</Text>
                    <Text style={styles.priceText}>{`${item.schedules[0].price/1}`} ₽</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
  </View>
          )}
      </View>
      {/* <View className="mx-4 h-5/6 flex justify-center align-center space-y-6">
      <Text className="text-white text-center text-2xl">Welcome {user?.email}!</Text>
    </View> */}
    </View>
    
  );
}


const styles = StyleSheet.create({
  categoryImg: {
    marginTop: 60,
    marginLeft: 20,
    marginBottom: 30
  },
  Panelslider: {
    backgroundColor: 'rgba(0, 17, 35, 0.75)',
    borderRadius: 19,
    height: 110,
    paddingLeft: 0,
    marginRight: 20,
    position:'absolute',
    bottom: 0,
    right: 0,
    left: 0,
  },

  textPanelslider: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: '22',
    padding: 20,
    width: '80%'
  },
  container: {
    backgroundColor: 'white',
    alignItems: 'center',

  },
  zagText: {
    color: '#00274E',
    fontSize: 20,
    lineHeight: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    marginTop: 30,
    marginBottom: 10
  },
  linkText: {
    color: '#00274E',
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400',
    position: 'absolute',
    right: 10,
    top: 30,
  },
  MainContainer: {

  },
  gallery: {
    width: 300,
    position: 'relative',
    paddingRight: 20,
    borderRadius: 10,
    height: 400,
    alignSelf: 'flex-start'
  },
  img: {
    height: 250,
    position: 'relative',
    borderRadius: 19,
  },
  textPanel: {
    zIndex:9,
    height: 80,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderRadius: 10,
    padding: 10,
    margin: 10,
    backgroundColor: 'rgba(0, 17, 35, 0.75)'
  },
  rowCont: {

  },
  colCont: {
    marginTop: 20
  },
  colItem: {
    padding: 10
  },
  colImg: {
    width: 300,
    height: 300,
    borderRadius: 10,
    zIndex: 0,
  },
  colText: {
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 18,
    color: 'white',
    width: '90%'
  },
  priceText: {
    color: '#F4D150',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 10,
    right: 10,
    fontWeight: '500',
    fontSize: 15,
    lineHeight: 15,
  },
  pricePanelText: {
    color: '#F4D150',
    alignSelf: 'flex-end',
    position: 'absolute',
    bottom: 20,
    right: 20,
    fontWeight: '500',
    fontSize: 25,

  },
  wrap: {
    width: 300,
    height: 300,
    position: 'relative',
    top: 0,
    paddingLeft: 10
  },
item: {

}
});