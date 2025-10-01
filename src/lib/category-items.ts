const categoryItems: CategoryItems = {
    headphones: {
          mobile: {
              image: "/assets/shared/mobile/image-category-thumbnail-headphones.png",
              link: "/products/headphones",
          },
          tablet: {
              image: "/assets/shared/tablet/image-category-thumbnail-headphones.png",
              link: "/products/headphones",
          },
          desktop: {
              image: "/assets/shared/desktop/image-category-thumbnail-headphones.png",
              link: "/products/headphones",
          },
    },
    speakers: {
        mobile: {
            image: "/assets/shared/mobile/image-category-thumbnail-speakers.png",
            link: "/products/speakers",
        },
        tablet: {
            image: "/assets/shared/tablet/image-category-thumbnail-speakers.png",
            link: "/products/speakers",
        },
        desktop: {
            image: "/assets/shared/desktop/image-category-thumbnail-speakers.png",
            link: "/products/speakers",
        },
    },
    earphones: {
        mobile: {
            image: "/assets/shared/mobile/image-category-thumbnail-earphones.png",
            link: "/products/earphones",
        },
        tablet: {
            image: "/assets/shared/tablet/image-category-thumbnail-earphones.png",
            link: "/products/earphones",
        },
        desktop: {
            image: "/assets/shared/desktop/image-category-thumbnail-earphones.png",
            link: "/products/earphones",
        },
    },
};

type CategoryItems = {
    headphones: {
        mobile: data;
        tablet: data;
        desktop: data;
    };
    speakers: {
        mobile: data;
        tablet: data;
        desktop: data;
    };
    earphones: {
        mobile: data;
        tablet: data;
        desktop: data;
    };
};

type data = {
    image: string;
    link: string;
};
export default categoryItems;
