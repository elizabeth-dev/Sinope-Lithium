import React from 'react';
import { SearchStyles as styles } from './Search.styles';
import { FlatList, Pressable, View } from 'react-native';
import { Divider } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { fromSearch } from '@core/state/selectors/search.selectors';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { SearchActions } from '@core/state/actions/search.actions';
import { Navigation } from 'react-native-navigation';
import { searchScreenLayer } from '@shared/navigation/layers/search-screen.layer';
import { TextInput } from '@shared/components/text-input/TextInput.component';
import { Typography } from '@shared/components/typography/Typography.component';

export interface SearchProps {
	stackId: string;
}

export const Search: React.FC<SearchProps> = ({ stackId }) => {
	const dispatch = useAppDispatch();

	const searchHistory = useSelector(fromSearch.history);
	const [searchText, setSearchText] = React.useState('');

	const onSearch = (searchTerm: string) => {
		setSearchText('');
		dispatch(SearchActions.search(searchTerm));
		Navigation.push(stackId, searchScreenLayer(searchTerm));
	};

	const onRemoveSearch = (searchTerm: string) => {
		dispatch(SearchActions.remove(searchTerm));
	};

	return (<View style={styles.root}>
		<TextInput
			placeholder="Search"
			value={searchText}
			onChangeText={text => setSearchText(text)}
			onSubmitEditing={() => onSearch(searchText)}
		/>
		<FlatList
			style={styles.history}
			data={searchHistory}
			renderItem={({ item }) => (<Pressable
				android_ripple={{
					color: 'grey',
					borderless: false,
				}}
				style={styles.historyElement}
				onPress={() => onSearch(item)}
				onLongPress={() => onRemoveSearch(item)}
			>
				<Typography.Body>{item}</Typography.Body>
			</Pressable>)}
			keyExtractor={item => item}
			ItemSeparatorComponent={Divider}
		/>
	</View>);
};
