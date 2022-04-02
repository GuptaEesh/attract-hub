import { EmptyPage, WishCard, WishCardGrey } from '../../components/composite'
import emptyWishlist from '../../images/wishlist.svg'
import { useCart } from '../../helpers/contexts/cart-context'

export function WishList() {
    const { wishItems } = useCart()
    return (
        <div className="align-center flex flex-column">
            <h2 className="size-20" style={{ margin: '1rem' }}>
                Wishlist ({wishItems.length})
            </h2>
            <section
                className="flex flex-wrap justify-space-around"
                style={{ gap: '1rem' }}
            >
                {wishItems.length ? (
                    wishItems.map((product) =>
                        product.inStock ? (
                            <WishCard
                                key={product.id}
                                greyClass={false}
                                product={product}
                            />
                        ) : (
                            <WishCardGrey
                                key={product.id}
                                greyText={
                                    product.comingSoon
                                        ? 'Coming Soon...'
                                        : 'Long Wait..🤐😞'
                                }
                                product={product}
                            />
                        )
                    )
                ) : (
                    <EmptyPage
                        imgSrc={emptyWishlist}
                        altText="Empty Wishlist"
                    />
                )}
            </section>
        </div>
    )
}
