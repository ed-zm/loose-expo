import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';


const List = ({ items = [], loading = false, renderItem, onFetchMore = () => {}, pageInfo }) => {
  return (
    <SafeAreaView>
      <FlatList
        data={items}
        renderItem={ item => renderItem(renderItem)}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}


export default List;