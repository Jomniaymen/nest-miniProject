import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';

const mockProduct = {
  _id: 'someProductId',
  namepro: 'test product',
  description: 'test product description',
  price: 50,
  orders: [],
};

const mockProductDto: ProductDto = {
  namepro: 'test product',
  description: 'test product description',
  price: 50,
  orders: [],
};

const mockProductService = {
  createProduct: jest.fn().mockResolvedValue(mockProduct),
  getallpro: jest.fn().mockResolvedValue([mockProduct]),
  getProductById: jest.fn().mockResolvedValue(mockProduct),
  updateProduct: jest.fn().mockResolvedValue(mockProduct),
  deleteProduct: jest.fn().mockResolvedValue(mockProduct),
};

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .overrideGuard(RolesGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createProduct', () => {
    it('should create a new product', async () => {
      const result = await controller.createProduct(mockProductDto);
      expect(result).toEqual(mockProduct);
      expect(service.createProduct).toHaveBeenCalledWith(mockProductDto);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const result = await controller.getAllProducts();
      expect(result).toEqual([mockProduct]);
      expect(service.getallpro).toHaveBeenCalled();
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const result = await controller.getProductById('someProductId');
      expect(result).toEqual(mockProduct);
      expect(service.getProductById).toHaveBeenCalledWith('someProductId');
    });
  });

  describe('updateProduct', () => {
    it('should update a product by id', async () => {
      const result = await controller.updateProduct('someProductId', mockProductDto);
      expect(result).toEqual(mockProduct);
      expect(service.updateProduct).toHaveBeenCalledWith('someProductId', mockProductDto);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by id', async () => {
      const result = await controller.deleteProduct('someProductId');
      expect(result).toEqual(mockProduct);
      expect(service.deleteProduct).toHaveBeenCalledWith('someProductId');
    });
  });
});
