# Generated by Django 4.2 on 2024-06-23 04:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tienda', '0002_cliente_reseña_pedido'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'ordering': ['name'], 'verbose_name': 'category', 'verbose_name_plural': 'categories'},
        ),
        migrations.AlterModelOptions(
            name='product',
            options={'ordering': ['name'], 'verbose_name': 'product', 'verbose_name_plural': 'products'},
        ),
        migrations.RemoveIndex(
            model_name='category',
            name='tienda_cate_name_962fdb_idx',
        ),
        migrations.RemoveIndex(
            model_name='product',
            name='tienda_prod_id_e35fd0_idx',
        ),
        migrations.RemoveIndex(
            model_name='product',
            name='tienda_prod_name_4107e4_idx',
        ),
        migrations.RemoveIndex(
            model_name='product',
            name='tienda_prod_created_a157a7_idx',
        ),
        migrations.RenameField(
            model_name='product',
            old_name='update',
            new_name='updated',
        ),
        migrations.AlterField(
            model_name='product',
            name='slug',
            field=models.SlugField(max_length=200, unique=True),
        ),
    ]