from .predictor import DiseasePredictor

class DiseaseDetectionService:
    _instance = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = DiseasePredictor()
        return cls._instance

    @classmethod
    def predict(cls, file_obj, target_crop: str = "Tomato") -> dict:
        predictor = cls.get_instance()
        return predictor.predict_image(file_obj, target_crop=target_crop)
