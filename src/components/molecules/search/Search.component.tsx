import { Divider } from '@atoms/divider/Divider.component';
import { TextInput } from '@atoms/text-input/TextInput.component';
import { Typography } from '@atoms/typography/Typography.component';
import React from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { SearchStyles as styles } from './Search.styles';

export interface SearchProps {
	onSearch: (searchTerm: string) => void;
	onRemoveSearch: (searchTerm: string) => void;
	searchHistory: string[];
}

export const Search: React.FC<SearchProps> = ({ onSearch: _onSearch, onRemoveSearch, searchHistory }) => {
	const [searchText, setSearchText] = React.useState('');

	const onSearch = (searchTerm: string) => {
		setSearchText('');
		_onSearch(searchTerm);
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
