import { SearchActions } from '@actions/search.actions';
import { Divider } from '@atoms/divider/Divider.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import { Typography } from '@atoms/typography/Typography.component';
import { fromSearch } from '@core/state/selectors/search.selectors';
import { useAppDispatch } from '@shared/hooks/use-shallow-selector/useAppDispatch.hook';
import { searchScreenLayer } from '@shared/navigation/layers/search-screen.layer';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { useSelector } from 'react-redux';
import { SearchStyles as styles } from './Search.styles';

export interface SearchProps {
	stackId: string;
}

export const Search: React.FC<SearchProps> = ({ stackId }) => {
	const dispatch = useAppDispatch();

	const searchHistory = useSelector(fromSearch.history);
	const [searchText, setSearchText] = React.useState('');

	const onSearch = (searchTerm: string) => {
		setSearchText('');
		dispatch(SearchActions.search({ searchTerm: searchTerm }));
		Navigation.push(stackId, searchScreenLayer(searchTerm));
	};

	const onRemoveSearch = (searchTerm: string) => {
		dispatch(SearchActions.remove({ searchTerm: searchTerm }));
	};

	return (
		<View style={styles.root}>
			<TextInput
				placeholder="Search"
				value={searchText}
				onChangeText={(text) => setSearchText(text)}
				onSubmitEditing={() => onSearch(searchText)}
			/>
			<FlatList
				style={styles.history}
				data={searchHistory}
				renderItem={({ item }) => (
					<Pressable
						android_ripple={{
							color: 'grey',
							borderless: false,
						}}
						style={styles.historyElement}
						onPress={() => onSearch(item)}
						onLongPress={() => onRemoveSearch(item)}>
						<Typography.Body>{item}</Typography.Body>
					</Pressable>
				)}
				keyExtractor={(item) => item}
				ItemSeparatorComponent={Divider}
			/>
		</View>
	);
};
