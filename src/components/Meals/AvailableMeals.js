import {useEffect, useState} from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(undefined);

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('https://react-food-app-f788b-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json');
			
			if (!response.ok) {
				throw new Error('something went wrong!');
			}

			const responseData = await response.json();

			const loadedMeals = [];

			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				});
			}
			setMeals(loadedMeals);
			setIsLoading(false)

		};

			fetchMeals().catch(error => {
				setIsLoading(false)
				setError(error.message)
			});		
	}, [])

	if (isLoading){
		return<section className={classes.MealsLoading}>
			<p>Loading.....</p>
		</section>
	};

	if (error) {
		<section className={classes.httpError}>
			<p>{error}</p>
		</section>
	}

	const mealsList = meals.map((meal) => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price} />);
		
	return <section className={classes.meals}>
		<Card>
			<ul>
				{mealsList}
			</ul>	
		</Card>
	</section>
}

export default AvailableMeals;