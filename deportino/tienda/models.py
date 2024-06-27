from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'category'
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True)
    image = models.ImageField(upload_to='products/%Y/%m/%d', blank=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['name']
        verbose_name = 'product'
        verbose_name_plural = 'products'

    def __str__(self):
        return self.name

class Cliente(models.Model):
    nombre = models.CharField(max_length=200)
    apellidos = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    direccion = models.CharField(max_length=200)
    ciudad = models.CharField(max_length=100)
    codigo_postal = models.CharField(max_length=10)
    telefono = models.CharField(max_length=15)

    class Meta:
        verbose_name = 'cliente'
        verbose_name_plural = 'clientes'

    def __str__(self):
        return f'{self.nombre} {self.apellidos}'

class Pedido(models.Model):
    cliente = models.ForeignKey(Cliente, related_name='pedidos', on_delete=models.CASCADE)
    fecha = models.DateTimeField(auto_now_add=True)
    direccion_entrega = models.CharField(max_length=250)
    ciudad_entrega = models.CharField(max_length=100)
    codigo_postal_entrega = models.CharField(max_length=10)
    pagado = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'pedido'
        verbose_name_plural = 'pedidos'

    def __str__(self):
        return f'Pedido {self.id}'

class Reseña(models.Model):
    producto = models.ForeignKey(Product, related_name='reseñas', on_delete=models.CASCADE)
    cliente = models.ForeignKey(Cliente, related_name='reseñas', on_delete=models.CASCADE)
    comentario = models.TextField()
    calificacion = models.PositiveIntegerField()
    fecha = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'reseña'
        verbose_name_plural = 'reseñas'
        ordering = ['-fecha']

    def __str__(self):
        return f'Reseña de {self.cliente} para {self.producto}'

class CustomUser(AbstractUser):
    pass

    # Opcional: puedes agregar campos adicionales
