export const useUpdateProducts = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: ({ id, productData }) => updateProduct(id, productData),
        onSuccess: () => {
            alert('Product updated successfully');
            navigate(-1);
        },
        onError: (error) => {
            console.log(error);
        },
    });
}
