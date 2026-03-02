import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PivotType, Post, PostCategory } from "@/types";
import { router } from "@inertiajs/react";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import categoryPosts from '../../../../routes/category-posts/index';

type PostCategoriesFormProps = {
    categories: PostCategory[]
    postId: Post['id']
    categoriesSelected: Post['categories']
};

export default function PostCategoriesForm({ categories, postId, categoriesSelected }: PostCategoriesFormProps) {
    const [processing, setProcessing] = useState(false);

    const handleCategory = (categoryId: PostCategory['id']) => {
        setProcessing(true);
        const categorySelected = categoriesSelected.find(category => category.id === categoryId)

        if (categorySelected) {
            handleUnsetCategory(categoryId, categorySelected.pivot.id)
        } else {
            handleSetCategory(categoryId)
        }
    }

    const handleSetCategory = (categoryId: PostCategory['id']) => {
        router.post(categoryPosts.store({
            post: postId
        }), { category_id: categoryId }, {
            preserveScroll: true,
            showProgress: false,
            forceFormData: false,
            onFinish() {
                setProcessing(false)
            },
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            }
        })
    }

    const handleUnsetCategory = (categoryId: PostCategory['id'], pivotId: PivotType['pivot']['id']) => {
        router.delete(categoryPosts.destroy({
            post: postId,
            category_post: pivotId,
        }), {
            preserveScroll: true,
            showProgress: false,
            forceFormData: false,
            onFinish() {
                setProcessing(false)
            },
            onError(error) {
                Object.values(error).forEach(value =>
                    toast.error(value))
            }
        })
    }

    const isCategorySelected = useMemo(() => (categoryId: PostCategory['id']) =>
        categoriesSelected.some(category => category.id === categoryId), [categoriesSelected])

    const disabled = useMemo(() => (categoryId: PostCategory['id']) =>
        processing || (categoriesSelected.length === 1 && isCategorySelected(categoryId)), [processing, categoriesSelected, isCategorySelected])

    return (
        <form className="flex flex-col gap-4">
            <p
                className="text-foreground leading-none font-bold select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
            >
                Categorías:
            </p>

            <div className="grid gap-1 grid-cols-1">
                {categories.map((category) => (
                    <div className="flex gap-2 items-center" key={category.id}>
                        <Checkbox
                            onCheckedChange={() => handleCategory(category.id)}
                            id={category.slug}
                            name="categories"
                            disabled={disabled(category.id)}
                            checked={isCategorySelected(category.id)}
                        />

                        <Label
                            className="font-normal text-base"
                            htmlFor={category.slug}
                        >
                            {category.name}
                        </Label>
                    </div>
                ))}
            </div>
        </form>
    )
}
