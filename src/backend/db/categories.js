import { v4 as uuid } from 'uuid'

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
    {
        _id: uuid(),
        categoryName: 'Exhausts',
        image: 'https://drive.google.com/uc?export=view&id=1r14uHgHkdkOYM_OpVj76temIi0yKj9RD',
    },
    {
        _id: uuid(),
        categoryName: 'Wraps',
        image: 'https://drive.google.com/uc?export=view&id=1UZ7HQOPMpC2M2BJ18SbxSDZ0O6ijT3oJ',
    },
    {
        _id: uuid(),
        categoryName: 'Safety',
        image: 'https://drive.google.com/uc?export=view&id=1EyuvFi5kn69FORLiQAOMBZhu1zAOoocI',
    },
    {
        _id: uuid(),
        categoryName: 'Accessories',
        image: 'https://drive.google.com/uc?export=view&id=1CftX9cm1Cg1z7HYi_haZxjPtSzWgIyM-',
    },
]
